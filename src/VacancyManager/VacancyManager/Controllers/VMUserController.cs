using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Security;
using VacancyManager.Models;
using VacancyManager.Services;
using VacancyManager;
using VacancyManager.Services.Managers;

namespace VacancyManager.Controllers
{
  public class VMUserController : BaseController
  {
    static JavaScriptSerializer jss = new JavaScriptSerializer();
   
    [HttpPost]
    public ActionResult ExtJSLogOn(string login, string password)
    {
      bool logSuccess = false;
      string jsonResult = "Invalid login or password";
      Applicant App = new Applicant();
      object appModel = null;

      VMMembershipUser vmuser = (VMMembershipUser)Membership.GetUser(login, false);
      if (vmuser != null)
      {
          if ((vmuser.IsLockedOut) && (vmuser.IsApproved == false))
          {
              jsonResult = "Ваш аккаун заблокирован!!!";
          }
          else if ((vmuser.IsLockedOut) && (vmuser.IsApproved == true))
          { jsonResult = "Ваш аккаун не активирован!!!"; }

          else if (Membership.ValidateUser(login, password))
          {
              logSuccess = true;


              FormsAuthentication.SetAuthCookie(login, createPersistentCookie: true);
              App = ApplicantManager.GetApplicantByEMail(vmuser.Email);
              if (App == null) { App = new Applicant(); }
              appModel = new
              {
                  ApplicantID = App.ApplicantID,
                  FullName = App.FullName,
                  FullNameEn = App.FullNameEn,
                  ContactPhone = App.ContactPhone,
                  Employed = App.Employed,
                  Email = App.Email,
                  Requirements = ""
              };
          }
      }

      else
      {
          jsonResult = "Неправильный логин или пароль";
          logSuccess = false;
          appModel = null;
      }
      return Json(new  { success = logSuccess, 
                         applicant = appModel,
                         LogOnResult = jsonResult}, JsonRequestBehavior.AllowGet);
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

    public ActionResult ExtJSLogOff()
    {
      FormsAuthentication.SignOut();

      return null;
    }

    [HttpPost]
    [AuthorizeError(Roles = "Admin")]
    public JsonResult ExtJSCreateUser(string data)
    {

      if (data != null)
      {
        var json_User = jss.Deserialize<dynamic>(data);
        string UserName = json_User["UserName"].ToString();
        string Email = json_User["Email"].ToString();
        string Password = json_User["Password"].ToString();

        Tuple<bool, string, VMMembershipUser> result = SharedCode.CreateNewUser(UserName, Email, Password, activate: true, setAsAdmin: true);
        if (result.Item1)
        {
            /* Данный кусочек получает значение параметра IsBodyHtml в конфигурации.
             * Но в данный момент, если шаблон не содержит html теги, то со значением true,
             * ломается табуляция и перенос строк в готовом сообщении.
             * TODO. Реализовать какую-нибудь проверку шаблонов на наличие тегов и после
             * проверки возвращать готовое значение в метод Send.
                    
            string Body = Helper.Format(Templates.UserAdd, new TemplateProp {
                UserName = json_User["UserName"].ToString(),
                Email = json_User["Email"].ToString()
            });
            bool isBodyHtml = SysConfigManager.GetBoolParameter("IsBodyHtml", false);
            if (!isBodyHtml)
                Body = Helper.CutTags(Body);
             
            */
            //var sendMail = MailSender.Send(json_User["Email"].ToString(), Templates.UserAdd_Topic, Body, false);
        }
        return CreateJsonAnwser(result.Item1, result.Item2, result.Item3);

      }

      return CreateJsonAnwser(false, "При создании пользователя произошла ошибка", null);
    }

    [HttpPost]
    [AuthorizeError(Roles = "Admin")]
    public JsonResult ExtJSDeleteUser(string data)
    {
      bool success = false;
      string message = "Не удалось удалить пользователя";
     
      if (data != null)
      {
        var json_User = jss.Deserialize<dynamic>(data);

        if (Membership.DeleteUser(json_User["UserName"]))
        {
            /* Данный кусочек получает значение параметра IsBodyHtml в конфигурации.
             * Но в данный момент, если шаблон не содержит html теги, то со значением true,
             * ломается табуляция и перенос строк в готовом сообщении.
             * TODO. Реализовать какую-нибудь проверку шаблонов на наличие тегов и после
             * проверки возвращать готовое значение в метод Send.
            
            string Body = Helper.Format(Templates.UserDelete, new TemplateProp
            {
                UserName = json_User["UserName"].ToString(),
            });
            bool isBodyHtml = SysConfigManager.GetBoolParameter("IsBodyHtml", false);
            if (!isBodyHtml)
                Body = Helper.CutTags(Body);
             
            var sendMail = MailSender.Send(json_User["Email"].ToString(), Templates.UserDelete_Topic, Body, false);
             */
          message = "Пользователь удалён";
          success = true;
        }
      }
      return Json(new { success, message });
    }

    /// <summary>
    /// Exts the JS update user.
    /// </summary>
    /// <param name="data">The data.</param>
    /// <returns></returns>
    [HttpPost]
    [AuthorizeError(Roles = "Admin")]
    //TODO: Рассмотреть возможность перехода к табличному подходу
    public JsonResult ExtJSUpdateUser(string data)
    {
      if (data != null)
      {
        dynamic record = jss.Deserialize<dynamic>(data);

        VMMembershipUser userInDB = (VMMembershipUser)Membership.GetUser(record["UserName"].ToString());

        Tuple<bool, string> result;

        //Либо пользователя перименовали, либо запрос попоротился
        if (userInDB == null)
        {
          //Если нужно будет добавить редактирование Email придётся как-то добавить свой метод в Membership
          //А этого вроде сделать нельзя
          userInDB = (VMMembershipUser)Membership.GetUser(Membership.GetUserNameByEmail(record["Email"].ToString()));
          userInDB = new VMMembershipUser("VacancyManagerMembershipProvider",
            username: record["UserName"],
            providerUserKey: record["UserID"],
            email: userInDB.Email,
            passwordQuestion: string.Empty,
            comment: userInDB.Comment,
            lastLockedOutReason: userInDB.LastLockedOutReason,
            isApproved: userInDB.IsApproved,
            LockedOut: (bool)record["IsLockedOut"],
            creationDate: userInDB.CreationDate,
            lastLoginDate: userInDB.LastLoginDate,
            lastActivityDate: DateTime.Now,
            lastPasswordChangedDate: DateTime.Now,
            lastLockedOutDate: userInDB.LastLockoutDate,
            EmailKey: userInDB.EmailKey);
        Membership.UpdateUser(userInDB);
        }
   
        //Проверка на возможность бана
        if (userInDB.IsLockedOut != (bool)record["IsLockedOut"])
        {
          result = CheckUserLockChanging(record, userInDB);
        }
        else
        {
          if (CheckUserRolesUpdating(record, userInDB))
            result = new Tuple<bool, string>(true, "Роли успешно изменены");
          else
          {
            result = new Tuple<bool, string>(true, "Заглушка под изменение имени пользователя");
          }
        }

        return CreateJsonAnwser(result.Item1, result.Item2, userInDB);
      }

      return CreateJsonAnwser(false, "При обновлении данных пользователя произошёл сбой", null);
    }

    [HttpPost]
    [AuthorizeError(Roles = "Admin")]
    public JsonResult ChangePassword(string passwordcredentials) 
    {
        string ChangeMessage = "Введенные пароли не совпадают!!!";    
        var passwordCredentials = jss.Deserialize<dynamic>(passwordcredentials);
        bool passChanged = false;
        string OldPassword = (string)passwordCredentials["oldpassword"],
              ConfirmPassword = (string)passwordCredentials["confirmpassword"],
              NewPassword = (string)passwordCredentials["newpassword"];
      
        if (NewPassword == ConfirmPassword)
        {
            VMMembershipUser userInDB = (VMMembershipUser)Membership.GetUser(User.Identity.Name);
            passChanged = userInDB.ChangePassword(OldPassword, NewPassword);
            if (passChanged) { ChangeMessage = "Пароль изменен!!!";

            }
            else { ChangeMessage = "Неверно введен старый пароль!!!"; }
        }

        return Json(new
        {
            success = passChanged,
            message = ChangeMessage
        });

    }

    private static Tuple<bool, string> CheckUserLockChanging(dynamic record, VMMembershipUser userInDB)
    {
      if (userInDB.IsApproved)//Забанить
      {
         userInDB.LastLockedOutReason = record["LastLockedOutReason"].ToString();
         userInDB.LockedOut = (bool)record["IsLockedOut"];
        //Возможно добавить сюда что либо с датами
        Membership.UpdateUser(userInDB);
        return new Tuple<bool, string>(true, "Пользователь забанен");
      }
      return new Tuple<bool, string>(false, "Нельзя разбанить неактивированного пользователя");
    }

    private static bool CheckUserRolesUpdating(dynamic record, VMMembershipUser userInDB)
    {
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
        if (changedRoles.Length != 0)
          Roles.AddUsersToRoles(new[] { userInDB.UserName }, changedRoles);
        return true;
      }
      return false;
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

    private static dynamic ReturnJsonUser(VMMembershipUser user)
    {
      if (user == null)
        throw new NullReferenceException();
      return new
      {
        UserID = user.ProviderUserKey,
        user.UserName,
        user.Email,
        UserComment = user.Comment,
        CreateDate = user.CreationDate,
        LastLoginDate = user.LastLoginDate,
        IsActivated = user.IsApproved,
        user.IsLockedOut,
        LastLockedOutDate = user.LastLockoutDate,
        user.LastLockedOutReason,
        Roles = Roles.GetRolesForUser(user.UserName)
      };
    }

  }
}
