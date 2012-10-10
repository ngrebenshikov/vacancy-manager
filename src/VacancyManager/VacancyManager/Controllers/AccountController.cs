using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
using VacancyManager.Models;
using VacancyManager.Services;

namespace VacancyManager.Controllers
{
  public class AccountController : Controller
  {

    //
    // GET: /Account/LogOn

    public ActionResult LogOn()
    {
      return View();
    }

    //
    // POST: /Account/LogOn

    [HttpPost]
    public ActionResult LogOn(LogOnModel model, string returnUrl)
    {
      if (ModelState.IsValid)
      {
        if (Membership.ValidateUser(model.UserName, model.Password))
        {
          FormsAuthentication.SetAuthCookie(model.UserName, model.RememberMe);
          if (Url.IsLocalUrl(returnUrl) && returnUrl.Length > 1 && returnUrl.StartsWith("/")
              && !returnUrl.StartsWith("//") && !returnUrl.StartsWith("/\\"))
          {
            return Redirect(returnUrl);
          }
          return RedirectToAction("IndexOld", "Home");
        }
        ModelState.AddModelError("", "Имя пользователя или пароль указаны неверно.");
      }

      // Появление этого сообщения означает наличие ошибки; повторное отображение формы
      return View(model);
    }

    [HttpPost]
    public ActionResult ExtJSLogOn(string login, string password)
    {
      string jsonResult = "";
      if (Membership.ValidateUser(login, password))
      {
        FormsAuthentication.SetAuthCookie(login, createPersistentCookie: true);
      }
      else
        jsonResult = "Invalid login or password";
      return Json(new { success = true, LogOnResult = jsonResult }, JsonRequestBehavior.AllowGet);
    }

    [HttpGet]
    [AuthorizeError(Roles = "Admin")]
    public JsonResult ExtJSUserListLoad()
    {
      var AllUsers = Membership.GetAllUsers();

      List<dynamic> UserList = AllUsers.Cast<VMMembershipUser>().Select(realUser => ReturnJsonUser(realUser)).ToList();

      return Json(new
      {
        data = UserList,
        total = UserList.Count,
        success = true
      }, JsonRequestBehavior.AllowGet);
    }

    [HttpPost]
    [AuthorizeError(Roles = "Admin")]
    public JsonResult ExtJSCreateUser(string data)
    {
      string message = "При создании пользователя произошла ошибка";
      JavaScriptSerializer jss = new JavaScriptSerializer();
      if (data != null)
      {
        var c_User = jss.Deserialize<dynamic>(data);
        string UserName = c_User["UserName"].ToString();
        string Email = c_User["Email"].ToString();
        string Password = c_User["Password"].ToString();
        MembershipCreateStatus createStatus;
        Membership.CreateUser(UserName, Password, Email, null, null, true, null, out createStatus);
        if (createStatus == MembershipCreateStatus.Success)
        {
          var user = (VMMembershipUser)Membership.GetUser(UserName, false);
          string ActivationLink = "http://localhost:53662/Account/Activate/" +
                                  user.UserName + "/" + user.EmailKey;
          EMailSender.SendMail(ActivationLink, user.Email);
          message = "Пользователь создан";
          return CreateJsonAnwser(true, message, user);
          /*var roles = Roles.GetRolesForUser(user.UserName);
          return Json(new
                        {
                          success = true,
                          message = message,
                          data = new
                          {
                            UserID = user.ProviderUserKey,
                            user.UserName,
                            user.Email,
                            UserComment = user.Comment,
                            CreateDate = user.CreationDate,
                            LaslLoginDate = user.LastLoginDate,
                            IsActivated = user.IsApproved,
                            user.IsLockedOut,
                            LastLockedOutDate = user.LastLockoutDate,
                            user.LastLockedOutReason,
                            Roles = roles
                          }
                        });*/
        }
        message = ErrorCodeToString(createStatus);
      }
      return CreateJsonAnwser(false, message, null);
    }

    [HttpPost]
    [AuthorizeError(Roles = "Admin")]
    public JsonResult ExtJSDeleteUser(string data)
    {
      bool d_success = false;
      string d_message = "Не удалось удалить пользователя";
      JavaScriptSerializer jss = new JavaScriptSerializer();
      if (data != null)
      {
        var d_User = jss.Deserialize<dynamic>(data);

        if (Membership.DeleteUser(d_User["UserName"]))
        {
          d_message = "Пользователь удалён";
          d_success = true;
        }
      }
      return Json(new
      {
        success = d_success,
        message = d_message
      });
    }

    /// <summary>
    /// Exts the JS update user.
    /// </summary>
    /// <param name="data">The data.</param>
    /// <returns></returns>
    [HttpPost]
    [AuthorizeError(Roles = "Admin")]
    public JsonResult ExtJSUpdateUser(string data)
    {
      bool success = false;
      string message = "При обновлении данных пользователя произошёл сбой";
      JavaScriptSerializer jss = new JavaScriptSerializer();

      if (data != null)
      {
        var record = jss.Deserialize<dynamic>(data);

        VMMembershipUser userInDB = (VMMembershipUser)Membership.GetUser(record["UserName"].ToString());

        //Проверка на возможность бана
        if (userInDB.IsApproved != (bool)record["IsActivated"])
        {
          if (userInDB.IsApproved)//Забанить
          {
            userInDB.IsApproved = (bool)record["IsActivated"];
            userInDB.LastLockedOutReason = record["LastLockedOutReason"].ToString();
            //Возможно добавить сюда что либо с датами
            Membership.UpdateUser(userInDB);
            success = true;
            message = "Пользователь забанен";
          }
          else//Разбанить
          {
            if (userInDB.EmailKey == null)
            {
              userInDB.UnlockUser();
              success = true;
              message = "Пользователь разбанен";
            }
            else
            {
              success = false;
              message = "Нельзя разбанить неактивированного пользователя";
            }
          }
        }
        //Проверка на смену ролей
        string[] currentRoles = Roles.GetRolesForUser(userInDB.UserName);
        string[] changedRoles = new string[record["Roles"].Length];
        bool rolesChanged = false;
        for (int i = 0; i < changedRoles.Length; i++)
        {
          if (!currentRoles.Any(x => x.Equals(record["Roles"][i].ToString())))
            rolesChanged = true;
          changedRoles[i] = (record["Roles"][i].ToString());
        }
        if (currentRoles.Length != changedRoles.Length || rolesChanged)
        {
          if (currentRoles.Length != 0)
            Roles.RemoveUsersFromRoles(new[] { userInDB.UserName }, currentRoles);
          Roles.AddUsersToRoles(new[] { userInDB.UserName }, changedRoles);
          success = true;
          message = "Роли успешно изменены";
        }
        return CreateJsonAnwser(success, message, userInDB);
        /*var roles = Roles.GetRolesForUser(userInDB.UserName);
        return Json(new
        {
          success = success,
          message = message,
          data = new
          {
            UserID = userInDB.ProviderUserKey,
            userInDB.UserName,
            userInDB.Email,
            UserComment = userInDB.Comment,
            CreateDate = userInDB.CreationDate,
            LaslLoginDate = userInDB.LastLoginDate,
            IsActivated = userInDB.IsApproved,
            userInDB.IsLockedOut,
            LastLockedOutDate = userInDB.LastLockoutDate,
            userInDB.LastLockedOutReason,
            Roles = roles
          }
        });*/
      }
      return CreateJsonAnwser(success, message, null);
    }

    //
    // GET: /Account/LogOff

    public ActionResult LogOff()
    {
      FormsAuthentication.SignOut();

      return RedirectToAction("IndexOld", "Home");
    }

    //
    // GET: /Account/Register

    public ActionResult Register()
    {
      return View();
    }

    //
    // POST: /Account/Register

    [HttpPost]
    public ActionResult Register(RegisterModel model)
    {
      if (ModelState.IsValid)
      {
        // Попытка зарегистрировать пользователя
        MembershipCreateStatus createStatus;
        Membership.CreateUser(model.UserName, model.Password, model.Email, null, null, true, null, out createStatus);

        if (createStatus == MembershipCreateStatus.Success)
        {
          //FormsAuthentication.SetAuthCookie(model.UserName, false /* createPersistentCookie */);
          var user = (VMMembershipUser)Membership.GetUser(model.UserName, false);
          string ActivationLink = "http://localhost:53662/Account/Activate/" +
                                    model.UserName + "/" + user.EmailKey;
          return RedirectToAction(EMailSender.SendMail(ActivationLink, model.Email) ? "ConfirmReg/1" : "ConfirmReg/0", "Account");
        }
        ModelState.AddModelError("", ErrorCodeToString(createStatus));
      }

      // Появление этого сообщения означает наличие ошибки; повторное отображение формы
      return View(model);
    }

    [HttpGet]
    public ActionResult ConfirmReg(int id)
    {
      ViewBag.Message = id == 1 ? "Для ипользования аккаунта его нужно активировать! Вам выслано письмо на почту." : "При отправке письма для активации произошла ошибка. Свяжитесь с администратором сайта.";
      return View();
    }

    [Obsolete("Возможно должен быть переделан")]
    public ActionResult Activate(string username, string key)
    {
      VMMembershipUser user = (VMMembershipUser)Membership.GetUser(username, false);
      if (user == null)
        return Redirect("Error");
      if (user.EmailKey != key)
        return RedirectToAction("IndexOld", "Home");
      user.UnlockUser();
      //user.IsApproved = true; //Активировали
      user.EmailKey = null; //Чтобы нельзя было больше активировать user
      Membership.UpdateUser(user);
      return RedirectToAction("LogOn");
    }


    //
    // GET: /Account/ChangePassword

    [Authorize]
    public ActionResult ChangePassword()
    {
      return View();
    }

    //
    // POST: /Account/ChangePassword

    [Authorize]
    [HttpPost]
    public ActionResult ChangePassword(ChangePasswordModel model)
    {
      if (ModelState.IsValid)
      {

        // При некоторых сценариях сбоя операция смены пароля ChangePassword вызывает исключение,
        // а не возвращает значение false (ложь).
        bool changePasswordSucceeded;
        try
        {
          MembershipUser currentUser = Membership.GetUser(User.Identity.Name, true /* userIsOnline */);
          changePasswordSucceeded = currentUser.ChangePassword(model.OldPassword, model.NewPassword);
        }
        catch (Exception)
        {
          changePasswordSucceeded = false;
        }

        if (changePasswordSucceeded)
        {
          return RedirectToAction("ChangePasswordSuccess");
        }
        ModelState.AddModelError("", "Неправильный текущий пароль или недопустимый новый пароль.");
      }

      // Появление этого сообщения означает наличие ошибки; повторное отображение формы
      return View(model);
    }

    //
    // GET: /Account/ChangePasswordSuccess

    public ActionResult ChangePasswordSuccess()
    {
      return View();
    }

    private JsonResult CreateJsonAnwser(bool success, string message, VMMembershipUser user)
    {
      if (success)
      {
        return Json(new
        {
          success = true,
          message = message,
          data = ReturnJsonUser(user)
        });
      }
      return Json(new
      {
        success = false,
        message = message
      });
    }

    private dynamic ReturnJsonUser(VMMembershipUser user)
    {
      if (user == null)
        throw new NullReferenceException();
      var roles = Roles.GetRolesForUser(user.UserName);
      return new
               {
                 UserID = user.ProviderUserKey,
                 user.UserName,
                 user.Email,
                 UserComment = user.Comment,
                 CreateDate = user.CreationDate,
                 LaslLoginDate = user.LastLoginDate,
                 IsActivated = user.IsApproved,
                 user.IsLockedOut,
                 LastLockedOutDate = user.LastLockoutDate,
                 user.LastLockedOutReason,
                 Roles = roles
               };
    }

    #region Status Codes
    private static string ErrorCodeToString(MembershipCreateStatus createStatus)
    {
      // Полный список кодов состояния см. по адресу http://go.microsoft.com/fwlink/?LinkID=177550
      //.
      switch (createStatus)
      {
        case MembershipCreateStatus.DuplicateUserName:
          return "Имя пользователя уже существует. Введите другое имя пользователя.";

        case MembershipCreateStatus.DuplicateEmail:
          return "Имя пользователя для данного адреса электронной почты уже существует. Введите другой адрес электронной почты.";

        case MembershipCreateStatus.InvalidPassword:
          return "Указан недопустимый пароль. Введите допустимое значение пароля.";

        case MembershipCreateStatus.InvalidEmail:
          return "Указан недопустимый адрес электронной почты. Проверьте значение и повторите попытку.";

        case MembershipCreateStatus.InvalidAnswer:
          return "Указан недопустимый ответ на вопрос для восстановления пароля. Проверьте значение и повторите попытку.";

        case MembershipCreateStatus.InvalidQuestion:
          return "Указан недопустимый вопрос для восстановления пароля. Проверьте значение и повторите попытку.";

        case MembershipCreateStatus.InvalidUserName:
          return "Указано недопустимое имя пользователя. Проверьте значение и повторите попытку.";

        case MembershipCreateStatus.ProviderError:
          return "Поставщик проверки подлинности вернул ошибку. Проверьте введенное значение и повторите попытку. Если проблему устранить не удастся, обратитесь к системному администратору.";

        case MembershipCreateStatus.UserRejected:
          return "Запрос создания пользователя был отменен. Проверьте введенное значение и повторите попытку. Если проблему устранить не удастся, обратитесь к системному администратору.";

        default:
          return "Произошла неизвестная ошибка. Проверьте введенное значение и повторите попытку. Если проблему устранить не удастся, обратитесь к системному администратору.";
      }
    }
    #endregion
  }
}
