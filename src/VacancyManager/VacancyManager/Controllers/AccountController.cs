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
      return Json(new { LogOnResult = jsonResult }, JsonRequestBehavior.AllowGet);
    }

    [HttpGet]
    [AuthorizeError]
    public JsonResult ExtJSUserListLoad()
    {
      var AllUsers = Membership.GetAllUsers();

      List<dynamic> UserList = new List<dynamic>();

      foreach (VMMembershipUser realUser in AllUsers.Cast<VMMembershipUser>())
      {
        UserList.Add(new
        {
          UserID = realUser.ProviderUserKey,
          realUser.UserName,
          realUser.Email,
          UserComment = realUser.Comment,
          CreateDate = realUser.CreationDate,
          LaslLoginDate = realUser.LastLoginDate,
          IsActivated = realUser.IsApproved,
          realUser.IsLockedOut,
          LastLockedOutDate = realUser.LastLockoutDate,
          realUser.LastLockedOutReason,
        });
      }
      return Json(new
      {
        data = UserList,
        total = UserList.Count,
        success = true
      },
                  JsonRequestBehavior.AllowGet);
    }

    [HttpPost]
    [AuthorizeError]
    public JsonResult ExtJSCreateUser(string data)
    {
      string c_message = "При создании пользователя произошла ошибка";
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
          c_message = "Пользователь создан";
          return Json(new
                        {
                          success = true,
                          message = c_message,
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
                          }
                        });
        }
        c_message = ErrorCodeToString(createStatus);
      }
      return Json(new
      {
        success = false,
        message = c_message
      });
    }

    [HttpPost]
    [AuthorizeError]
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
      var user = (VMMembershipUser)Membership.GetUser(username, false);
      if (user.EmailKey != key)
        return RedirectToAction("IndexOld", "Home");
      user.UnlockUser();
      user.IsApproved = true; //Активировали
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
