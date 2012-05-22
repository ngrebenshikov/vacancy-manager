using System;
using System.Collections.Specialized;
using System.Linq;
using System.Web.Security;
using Ninject;
using VacancyManager.Models;

namespace VacancyManager.Services
{
  public sealed class VacancyManagerMembershipProvider : MembershipProvider
  {
    [Inject]
    public IRepository Repository { get; set; }

    private string _applicationName;
    private bool _enablePasswordReset;
    private bool _enablePasswordRetrieval;
    private bool _requiresQuestionAndAnswer;
    private bool _requiresUniqueEmail;
    private int _maxInvalidPasswordAttempts;
    private int _passwordAttemptWindow;
    private int _minRequiredPasswordLength;
    private int _minRequiredNonalphanumericCharacters;
    private string _passwordStrengthRegularExpression;
    private MembershipPasswordFormat _passwordFormat = MembershipPasswordFormat.Hashed;

    #region Properties

    public override bool EnablePasswordRetrieval
    {
      get { return _enablePasswordRetrieval; }
    }

    public override bool EnablePasswordReset
    {
      get { return _enablePasswordReset; }
    }

    public override bool RequiresQuestionAndAnswer
    {
      get { return _requiresQuestionAndAnswer; }
    }

    public override string ApplicationName
    {
      get { return _applicationName; }
      set { _applicationName = value; }
    }

    public override int MaxInvalidPasswordAttempts
    {
      get { return _maxInvalidPasswordAttempts; }
    }

    public override int PasswordAttemptWindow
    {
      get { return _passwordAttemptWindow; }
    }

    public override bool RequiresUniqueEmail
    {
      get { return _requiresUniqueEmail; }
    }

    public override MembershipPasswordFormat PasswordFormat
    {
      get { return _passwordFormat; }
    }

    public override int MinRequiredPasswordLength
    {
      get { return _minRequiredPasswordLength; }
    }

    public override int MinRequiredNonAlphanumericCharacters
    {
      get { return _minRequiredNonalphanumericCharacters; }
    }

    public override string PasswordStrengthRegularExpression
    {
      get { return _passwordStrengthRegularExpression; }
    }

    #endregion

    public override void Initialize(string name, NameValueCollection config)
    {
      if (config == null)
      {
        throw new ArgumentNullException("config");
      }

      if (string.IsNullOrEmpty(name))
      {
        name = "VacancyManagerMemdershipProvider";
      }

      if (String.IsNullOrEmpty(config["description"]))
      {
        config.Remove("description");
        config.Add("description", "VacancyManagerMemdershipProvider");
      }

      base.Initialize(name, config);

      _applicationName = GetConfigValue(config["applicationName"], System.Web.Hosting.HostingEnvironment.ApplicationVirtualPath);
      _maxInvalidPasswordAttempts = Convert.ToInt32(GetConfigValue(config["maxInvalidPasswordAttempts"], "5"));
      _passwordAttemptWindow = Convert.ToInt32(GetConfigValue(config["passwordAttemptWindow"], "10"));
      _minRequiredNonalphanumericCharacters = Convert.ToInt32(GetConfigValue(config["minRequiredNonalphanumericCharacters"], "1"));
      _minRequiredPasswordLength = Convert.ToInt32(GetConfigValue(config["minRequiredPasswordLength"], "6"));
      _enablePasswordReset = Convert.ToBoolean(GetConfigValue(config["enablePasswordReset"], "true"));
      _passwordStrengthRegularExpression = Convert.ToString(GetConfigValue(config["passwordStrengthRegularExpression"], ""));
      _enablePasswordRetrieval = Convert.ToBoolean(GetConfigValue(config["enablePasswordRetrieval"], "false"));
      _requiresQuestionAndAnswer = Convert.ToBoolean(GetConfigValue(config["requiresQuestionAndAnswer"], "false"));
      _requiresUniqueEmail = Convert.ToBoolean(GetConfigValue(config["requiresUniqueEmail"], "true"));
    }

    public override MembershipUser CreateUser(string username, string password, string email, string passwordQuestion, string passwordAnswer, bool isApproved, object providerUserKey, out MembershipCreateStatus status)
    {
      var args = new ValidatePasswordEventArgs(username, password, true);
      OnValidatingPassword(args);

      if (args.Cancel)
      {
        status = MembershipCreateStatus.InvalidPassword;
        return null;
      }

      // Проверяем, существует ли пользователь по регистрируемому Email
      if (RequiresUniqueEmail && !string.IsNullOrEmpty(GetUserNameByEmail(email)))
      {
        status = MembershipCreateStatus.DuplicateEmail;
        return null;
      }

      MembershipUser u = GetUser(username, false);

      if (u == null)
      {
        try
        {
          Repository.CreateUser(username, password, email);
          status = MembershipCreateStatus.Success;

          return GetUser(username, false);
        }
        catch (InvalidOperationException)
        {
          status = MembershipCreateStatus.UserRejected;
          return null;
        }
      }
      else
      {
        status = MembershipCreateStatus.DuplicateUserName;
      }

      return null;
    }

    #region NotImplemented
    public override bool ChangePasswordQuestionAndAnswer(string username, string password, string newPasswordQuestion, string newPasswordAnswer)
    {
      throw new System.NotImplementedException();
    }

    public override string GetPassword(string username, string answer)
    {
      throw new System.NotImplementedException();
    }

    public override string ResetPassword(string username, string answer)
    {
      throw new System.NotImplementedException();
    }

    #endregion

    public override MembershipUser GetUser(object providerUserKey, bool userIsOnline)
    {
      return Repository.GetUser(providerUserKey, userIsOnline);
    }

    public override MembershipUserCollection FindUsersByName(string usernameToMatch, int pageIndex, int pageSize, out int totalRecords)
    {
      return Repository.FindUsersByName(usernameToMatch, pageIndex, pageSize, out totalRecords);
    }

    public override MembershipUserCollection FindUsersByEmail(string emailToMatch, int pageIndex, int pageSize, out int totalRecords)
    {
      return Repository.FindUsersByEmail(emailToMatch, pageIndex, pageSize, out totalRecords);
    }

    public override bool ChangePassword(string username, string oldPassword, string newPassword)
    {
      var args = new ValidatePasswordEventArgs(username, newPassword, true);
      OnValidatingPassword(args);

      return !args.Cancel && Repository.ChangePassword(username, oldPassword, newPassword);
    }

    public override int GetNumberOfUsersOnline()
    {
      return Membership.GetAllUsers().Cast<VMMembershipUser>().Count(realUser => realUser.IsOnline);
    }

    public override MembershipUser GetUser(string username, bool userIsOnline)
    {
      return Repository.GetMembershipUserByUserName(username);
    }

    public override bool DeleteUser(string username, bool deleteAllRelatedData)
    {
      return Repository.DeleteUser(username, deleteAllRelatedData);
    }

    public override MembershipUserCollection GetAllUsers(int pageIndex, int pageSize, out int totalRecords)
    {
      MembershipUserCollection result = Repository.GetAllUsers();
      totalRecords = result.Count;
      return result;
    }

    public override void UpdateUser(MembershipUser user)
    {
      Repository.UpdateMembershipUser(user);
    }

    public override bool UnlockUser(string userName)
    {
      return Repository.UnlockMembershipUser(userName);
    }

    public override string GetUserNameByEmail(string email)
    {
      var user = Repository.GetUserByEmail(email);

      return user != null ? user.UserName : string.Empty;
    }

    public override bool ValidateUser(string username, string password)
    {
      return Repository.ValidateUser(username, password);
    }

    #region Private methods

    private string GetConfigValue(string configValue, string defaultValue)
    {
      return (string.IsNullOrEmpty(configValue)) ? defaultValue : configValue;
    }

    #endregion
  }
}