using System;
using System.Web.Security;
using VacancyManager.Models;
using VacancyManager.Services;

namespace VacancyManager
{
  internal static class SharedCode
  {

    internal static Tuple<bool, string, VMMembershipUser> CreateNewUser(string name, string email, string password, bool activate, bool setAsAdmin)
    {
      MembershipCreateStatus createStatus;
      Membership.CreateUser(name, password, email, null, null, true, null, out createStatus);
      if (createStatus == MembershipCreateStatus.Success)
      {
        var user = (VMMembershipUser)Membership.GetUser(name, false);
        if (!activate)
        {
          string ActivationLink = "http://localhost:53662/Account/Activate/" +
                                  user.UserName + "/" + user.EmailKey;
          EMailSender.SendMail(ActivationLink, user.Email);
        }
        else
        {
          ActivateUser(name);
        }
        if (setAsAdmin)
        {
          if (!Roles.RoleExists("Admin"))
            Roles.CreateRole("Admin");
          Roles.AddUsersToRoles(new[] { user.UserName }, new[] { "Admin" });
        }

        return new Tuple<bool, string, VMMembershipUser>(true, "Пользователь создан", (VMMembershipUser)Membership.GetUser(name, false));
      }
      return new Tuple<bool, string, VMMembershipUser>(false, ErrorCodeToString(createStatus), null);
    }

    //Returning value will be used later, in non-Admin interface
    private static bool ActivateUser(string name, string activateKey = "")
    {
      VMMembershipUser user = (VMMembershipUser)Membership.GetUser(name, false);
      if ((user == null)
          || ((activateKey != "") && (user.EmailKey != activateKey)))
        return false;
      user.UnlockUser();
      user.EmailKey = null;
      Membership.UpdateUser(user);
      return true;
    }

    #region Status Codes

    internal static string ErrorCodeToString(MembershipCreateStatus createStatus)
    {
      // Полный список кодов состояния см. по адресу http://go.microsoft.com/fwlink/?LinkID=177550
      //.
      switch (createStatus)
      {
        case MembershipCreateStatus.DuplicateUserName:
          return "Имя пользователя уже существует. Введите другое имя пользователя.";

        case MembershipCreateStatus.DuplicateEmail:
          return
            "Имя пользователя для данного адреса электронной почты уже существует. Введите другой адрес электронной почты.";

        case MembershipCreateStatus.InvalidPassword:
          return "Указан недопустимый пароль. Введите допустимое значение пароля.";

        case MembershipCreateStatus.InvalidEmail:
          return "Указан недопустимый адрес электронной почты. Проверьте значение и повторите попытку.";

        case MembershipCreateStatus.InvalidAnswer:
          return
            "Указан недопустимый ответ на вопрос для восстановления пароля. Проверьте значение и повторите попытку.";

        case MembershipCreateStatus.InvalidQuestion:
          return "Указан недопустимый вопрос для восстановления пароля. Проверьте значение и повторите попытку.";

        case MembershipCreateStatus.InvalidUserName:
          return "Указано недопустимое имя пользователя. Проверьте значение и повторите попытку.";

        case MembershipCreateStatus.ProviderError:
          return
            "Поставщик проверки подлинности вернул ошибку. Проверьте введенное значение и повторите попытку. Если проблему устранить не удастся, обратитесь к системному администратору.";

        case MembershipCreateStatus.UserRejected:
          return
            "Запрос создания пользователя был отменен. Проверьте введенное значение и повторите попытку. Если проблему устранить не удастся, обратитесь к системному администратору.";

        default:
          return
            "Произошла неизвестная ошибка. Проверьте введенное значение и повторите попытку. Если проблему устранить не удастся, обратитесь к системному администратору.";
      }
    }

    #endregion
  }
}