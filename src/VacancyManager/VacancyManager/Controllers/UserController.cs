using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
using VacancyManager.Models;
using VacancyManager.Services;
using VacancyManager;

namespace VacancyManager.Controllers
{
  public class UserController : Controller
  {
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

    public ActionResult ExtJSLogOff()
    {
      FormsAuthentication.SignOut();

      return null;
    }

    [HttpPost]
    [AuthorizeError(Roles = "Admin")]
    public JsonResult ExtJSCreateUser(string data)
    {
      JavaScriptSerializer jss = new JavaScriptSerializer();

      if (data != null)
      {
        var json_User = jss.Deserialize<dynamic>(data);
        string UserName = json_User["UserName"].ToString();
        string Email = json_User["Email"].ToString();
        string Password = json_User["Password"].ToString();

        string Body = MessageTemplate.Get("New_Registration", new TemplateProp { 
            Name = json_User["UserName"].ToString(),
            Email = json_User["Email"].ToString() 
        });

        var sendMail = MailSender.Send(json_User["Email"].ToString(), "Добро пожаловать", Body);
        Tuple<bool, string, VMMembershipUser> result = SharedCode.CreateNewUser(UserName, Email, Password, activate: true, setAsAdmin: true);
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
      JavaScriptSerializer jss = new JavaScriptSerializer();
      if (data != null)
      {
        var json_User = jss.Deserialize<dynamic>(data);

        if (Membership.DeleteUser(json_User["UserName"]))
        {
          var sendMail = MailSender.Send(json_User["Email"].ToString(), "Сообщение об удалении", "Вынуждены Вам сообщить, что Вы удалены из базы");
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
      JavaScriptSerializer jss = new JavaScriptSerializer();

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
            isLockedOut: userInDB.IsLockedOut,
            creationDate: userInDB.CreationDate,
            lastLoginDate: userInDB.LastLoginDate,
            lastActivityDate: DateTime.Now,
            lastPasswordChangedDate: DateTime.Now,
            lastLockedOutDate: userInDB.LastLockoutDate,
            EmailKey: userInDB.EmailKey);
          Membership.UpdateUser(userInDB);
        }

        //Проверка на возможность бана
        if (userInDB.IsApproved != (bool)record["IsActivated"])
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

    private static Tuple<bool, string> CheckUserLockChanging(dynamic record, VMMembershipUser userInDB)
    {
      if (userInDB.IsApproved)//Забанить
      {
        userInDB.IsApproved = (bool)record["IsActivated"];
        userInDB.LastLockedOutReason = record["LastLockedOutReason"].ToString();
        //Возможно добавить сюда что либо с датами
        Membership.UpdateUser(userInDB);
        return new Tuple<bool, string>(true, "Пользователь забанен");
      }
      if (userInDB.EmailKey == null)
      {
        userInDB.UnlockUser();
        return new Tuple<bool, string>(true, "Пользователь разбанен");
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
      var roles = Roles.GetRolesForUser(user.UserName);
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
        Roles = roles
      };
    }

  }
}
