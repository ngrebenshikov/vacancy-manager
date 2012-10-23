using System;
using System.Collections.Specialized;
using System.Linq;
using System.Security.Cryptography;
using System.Web.Security;
using VacancyManager.Models;

namespace VacancyManager.Services
{
  public sealed class VacancyManagerMembershipProvider : MembershipProvider
  {

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
    private const MembershipPasswordFormat _passwordFormat = MembershipPasswordFormat.Hashed;

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
          TryCreateUser(username, password, email);
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
      throw new NotImplementedException();
    }

    public override string GetPassword(string username, string answer)
    {
      throw new NotImplementedException();
    }

    public override string ResetPassword(string username, string answer)
    {
      throw new NotImplementedException();
    }

    #endregion

    public override MembershipUser GetUser(object providerUserKey, bool userIsOnline)
    {
      VacancyContext _db = new VacancyContext();
      var dbuser = _db.Users.FirstOrDefault(u => u.UserID == Convert.ToInt32(providerUserKey));
      if ((userIsOnline) && (dbuser != null))
      {
        dbuser.LastLoginDate = DateTime.Now;
        _db.SaveChanges();
      }

      return getMembershipUserFromDBUser(dbuser);
    }

    public override MembershipUserCollection FindUsersByName(string usernameToMatch, int pageIndex, int pageSize, out int totalRecords)
    {
      return FindUserByPredicate(pageIndex, pageSize, out totalRecords,
        (x => x.UserName.IndexOf(usernameToMatch, StringComparison.OrdinalIgnoreCase) != 0));
    }

    public override MembershipUserCollection FindUsersByEmail(string emailToMatch, int pageIndex, int pageSize, out int totalRecords)
    {
      return FindUserByPredicate(pageIndex, pageSize, out totalRecords,
        (x => x.Email.IndexOf(emailToMatch, StringComparison.OrdinalIgnoreCase) != 0));
    }

    public override bool ChangePassword(string username, string oldPassword, string newPassword)
    {
      var args = new ValidatePasswordEventArgs(username, newPassword, true);
      OnValidatingPassword(args);

      bool flag;

      VacancyContext _db = new VacancyContext();
      var dbuser = _db.Users.SingleOrDefault(x => x.UserName.Equals(username, StringComparison.OrdinalIgnoreCase));
      if ((dbuser == null) || (!dbuser.Password.Equals(CreatePasswordHash(oldPassword, dbuser.PasswordSalt))))
        flag = false;
      else
      {
        dbuser.Password = CreatePasswordHash(oldPassword, dbuser.PasswordSalt);
        flag = true;
      }

      return !args.Cancel && flag;
    }

    public override int GetNumberOfUsersOnline()
    {
      return Membership.GetAllUsers().Cast<VMMembershipUser>().Count(realUser => realUser.IsOnline);
    }

    public override MembershipUser GetUser(string username, bool userIsOnline)
    {
      VacancyContext _db = new VacancyContext();
      var dbuser = _db.Users.FirstOrDefault(u => u.UserName == username);
      return getMembershipUserFromDBUser(dbuser);
    }

    public override bool DeleteUser(string username, bool deleteAllRelatedData)
    {
      VacancyContext _db = new VacancyContext();
      //deleteAllRelatedData currently not using
      var delete_user = _db.Users.SingleOrDefault(a => a.UserName == username);
      if (delete_user == null)
        return false;

      if (Roles.GetRolesForUser(delete_user.UserName).Count() != 0)
        Roles.RemoveUsersFromRoles(new[] { delete_user.UserName }, Roles.GetRolesForUser(delete_user.UserName));

      _db.Users.Remove(_db.Users.SingleOrDefault(a => a.UserName.Equals(delete_user.UserName)));
      _db.SaveChanges();

      return true;
    }

    public override MembershipUserCollection GetAllUsers(int pageIndex, int pageSize, out int totalRecords)
    {
      VacancyContext _db = new VacancyContext();
      MembershipUserCollection result = new MembershipUserCollection();
      foreach (var user in _db.Users.ToList())
      {
        result.Add(GetUser(user.UserName, false));
      }
      totalRecords = result.Count;
      return result;
    }

    public override void UpdateUser(MembershipUser user)
    {
      VacancyContext _db = new VacancyContext();
      var realUser = (VMMembershipUser)user;
      var update_rec = _db.Users.SingleOrDefault(a => a.UserName == realUser.UserName);
      if (update_rec == null)
        return;

      update_rec.Email = realUser.Email;
      update_rec.EmailKey = realUser.EmailKey;

      update_rec.IsActivated = realUser.IsApproved;
      update_rec.IsLockedOut = realUser.IsLockedOut;

      update_rec.LastLoginDate = realUser.LastLoginDate;
      update_rec.LastLockedOutReason = realUser.LastLockedOutReason;

      update_rec.UserName = realUser.UserName;
      _db.SaveChanges();
    }

    public override bool UnlockUser(string userName)
    {
      VacancyContext _db = new VacancyContext();
      var update_rec = _db.Users.SingleOrDefault(a => a.UserName == userName);

      if (update_rec != null)
      {
        update_rec.IsLockedOut = false;
        update_rec.IsActivated = true;
        _db.SaveChanges();
        return true;
      }

      return false;
    }

    public override string GetUserNameByEmail(string email)
    {
      VacancyContext _db = new VacancyContext();
      var user = _db.Users.FirstOrDefault(u => u.Email == email);

      return user != null ? user.UserName : string.Empty;
    }

    public override bool ValidateUser(string username, string password)
    {
      VacancyContext _db = new VacancyContext();
      var dbuser = _db.Users.FirstOrDefault(u => u.UserName == username);

      return dbuser != null && dbuser.Password == CreatePasswordHash(password, dbuser.PasswordSalt) && dbuser.IsActivated && !dbuser.IsLockedOut;
    }

    #region Private methods

    private string GetConfigValue(string configValue, string defaultValue)
    {
      return (string.IsNullOrEmpty(configValue)) ? defaultValue : configValue;
    }

    private MembershipUser getMembershipUserFromDBUser(User dbuser)
    {
      if (dbuser != null)
      {
        var user = new VMMembershipUser("VacancyManagerMembershipProvider",
          username: dbuser.UserName,
          providerUserKey: dbuser.UserID,
          email: dbuser.Email,
          passwordQuestion: string.Empty,
          comment: dbuser.UserComment,
          lastLockedOutReason: dbuser.LastLockedOutReason,
          isApproved: dbuser.IsActivated,
          isLockedOut: dbuser.IsLockedOut,
          creationDate: dbuser.CreateDate,
          lastLoginDate: dbuser.LastLoginDate,
          lastActivityDate: DateTime.Now,
          lastPasswordChangedDate: DateTime.Now,
          lastLockedOutDate: dbuser.LastLockedOutDate,
          EmailKey: dbuser.EmailKey);

        return user;
      }

      return null;
    }

    private MembershipUserCollection FindUserByPredicate(int pageIndex, int pageSize, out int totalRecords, Func<User, bool> predicate)
    {
      MembershipUserCollection result = new MembershipUserCollection();
      int index = 0;
      int from = pageIndex * pageSize;
      int to = (pageIndex + 1) * pageSize;
      VacancyContext _db = new VacancyContext();
      foreach (var user in _db.Users.Where(predicate))
      {
        index++;
        if ((index > from) && (index <= to))
          result.Add(getMembershipUserFromDBUser(user));
      }
      totalRecords = index;
      return result;
    }

    private static string CreatePasswordHash(string password, string salt)
    {
      string passwordAndSalt = String.Concat(password, salt);
      string hashedPassword = FormsAuthentication.HashPasswordForStoringInConfigFile(passwordAndSalt, "md5");

      return hashedPassword;
    }

    public void TryCreateUser(string username, string password, string email)
    {
      var user = new User
      {
        UserName = username,
        Email = email,
        PasswordSalt = CreateSalt(),
        CreateDate = DateTime.Now,
        IsActivated = false,
        IsLockedOut = true,
        LastLockedOutDate = DateTime.Now,
        LastLoginDate = DateTime.Now,
        EmailKey = GenerateKey(),
      };
      user.Password = CreatePasswordHash(password, user.PasswordSalt);
      VacancyContext _db = new VacancyContext();
      _db.Users.Add(user);
      _db.SaveChanges();
    }

    private static string CreateSalt()
    {
      var rng = new RNGCryptoServiceProvider();
      var buff = new byte[32];

      rng.GetBytes(buff);

      return Convert.ToBase64String(buff);
    }

    private static string GenerateKey()
    {
      Guid emailKey = Guid.NewGuid();
      return emailKey.ToString();
    }

    #endregion
  }
}