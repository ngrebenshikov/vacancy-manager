using System;
using System.Web.Security;
using VacancyManager.Models;
using VacancyManager.Services;
using System.Web.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace VacancyManager
{
  internal static class SharedCode
  {

      internal static string GetMd5Hash(MD5 md5Hash, string input)
      {

          byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

          StringBuilder sBuilder = new StringBuilder();

          for (int i = 0; i < data.Length; i++)
          {
              sBuilder.Append(data[i].ToString("x2"));
          }

          return sBuilder.ToString();
      }

      internal static bool VerifyMd5Hash(MD5 md5Hash, string input, string hash)
      {

          string hashOfInput = GetMd5Hash(md5Hash, input);

          StringComparer comparer = StringComparer.OrdinalIgnoreCase;

          if (0 == comparer.Compare(hashOfInput, hash))
          {
              return true;
          }
          else
          {
              return false;
          }
      }


    internal static Tuple<bool, string, VMMembershipUser> CreateNewUser(string name, string email, string password, bool activate, bool setAsAdmin)
    {
      MembershipCreateStatus createStatus;
      Membership.CreateUser(name, password, email, null, null, true, null, out createStatus);
      if (createStatus == MembershipCreateStatus.Success)
      {
        var user = (VMMembershipUser)Membership.GetUser(name, false);
        if (activate)          
        {
          ActivateUser(name);
        }
        if (setAsAdmin)
        {
         
            if (!Roles.RoleExists("Admin"))
            Roles.CreateRole("Admin");

          Roles.AddUsersToRoles(new[] { user.UserName }, new[] { "Admin" });
        }

        if (!setAsAdmin)
        {

            if (!Roles.RoleExists("User"))
                Roles.CreateRole("User");

            Roles.AddUsersToRoles(new[] { user.UserName }, new[] { "User" });
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