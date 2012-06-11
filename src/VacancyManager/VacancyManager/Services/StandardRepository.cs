using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Security.Cryptography;
using System.Web.Security;
using VacancyManager.Models;

namespace VacancyManager.Services
{
  class StandardRepository : IRepository
  {
    private static readonly VacancyContext _db = new VacancyContext();

    public IEnumerable<Vacancy> AllVisibleVacancies()
    {
      //VacancyContext _db = new VacancyContext();
      return _db.Vacancies.Where(vacancy => vacancy.IsVisible).ToList();
    }

    /*public IEnumerable<User> AllUsers()
    {
      return _db.Users.ToList();
    }*/

    #region MembershipUserMethods

    public MembershipUser GetMembershipUserByUserName(string username)
    {
      //VacancyContext _db = new VacancyContext();
      var dbuser = _db.Users.FirstOrDefault(u => u.UserName == username);
      return getMembershipUserFromDBUser(dbuser);
    }

    public void UpdateMembershipUser(MembershipUser user)
    {
      //VacancyContext _db = new VacancyContext();
      var realUser = (VMMembershipUser)user;
      var update_rec = _db.Users.SingleOrDefault(a => a.Email == realUser.Email);
      if (update_rec == null) return;
      update_rec.Email = realUser.Email;
      update_rec.EmailKey = realUser.EmailKey;
      update_rec.IsActivated = realUser.IsApproved;
      update_rec.IsLockedOut = realUser.IsLockedOut;
      update_rec.LaslLoginDate = realUser.LastLoginDate;
      //ƒва следующих свойства нужно сначала добавить в VMMembershipUser
      //update_rec.LastLockedOutDate=realUser.LastLockedOutDate;
      update_rec.LastLockedOutReason = realUser.LastLockedOutReason;
      //update_rec.Password//Ќе должно тут обновл€тьс€
      update_rec.UserName = realUser.UserName;
      _db.SaveChanges();
    }

    public bool UnlockMembershipUser(string userName)
    {
      //VacancyContext _db = new VacancyContext();
      try
      {
        var update_rec = _db.Users.SingleOrDefault(a => a.UserName == userName);
        if (update_rec != null)
        {
          update_rec.IsLockedOut = false;
          update_rec.IsActivated = true;
          _db.SaveChanges();
        }
      }
      catch
      {
        return false;
      }
      return true;
    }

    public void CreateUser(string username, string password, string email)
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
        LaslLoginDate = DateTime.Now,
        Comments = new Collection<Comment>(),
        Considerations = new Collection<Consideration>(),
        Resumes = new Collection<Resume>(),
        Files = new Collection<File>(),
        EmailKey = GenerateKey(),
      };
      user.Password = CreatePasswordHash(password, user.PasswordSalt);
      //VacancyContext _db = new VacancyContext();
      _db.Users.Add(user);
      _db.SaveChanges();
    }

    public bool ValidateUser(string username, string password)
    {
      //VacancyContext _db = new VacancyContext();
      var dbuser = _db.Users.FirstOrDefault(u => u.UserName == username);

      return dbuser != null && dbuser.Password == CreatePasswordHash(password, dbuser.PasswordSalt) && dbuser.IsActivated && !dbuser.IsLockedOut;
    }

    public MembershipUserCollection GetAllUsers()
    {
      //VacancyContext _db = new VacancyContext();
      MembershipUserCollection result = new MembershipUserCollection();
      foreach (var user in _db.Users.ToList())
      {
        result.Add(GetMembershipUserByUserName(user.UserName));
      }
      return result;
    }

    public bool DeleteUser(string username, bool deleteAllRelatedData)
    {
      //VacancyContext _db = new VacancyContext();
      //deleteAllRelatedData currently not using
      var delete_user = _db.Users.SingleOrDefault(a => a.UserName == username);
      if (delete_user == null) return false;
      if (Roles.GetRolesForUser(delete_user.UserName).Count() != 0)
        Roles.RemoveUsersFromRoles(new[] { delete_user.UserName }, Roles.GetRolesForUser(delete_user.UserName));
      _db.Users.Remove(_db.Users.SingleOrDefault(a => a.UserName.Equals(delete_user.UserName)));
      _db.SaveChanges();
      return true;
    }

    public User GetUserByEmail(string email)
    {
      //VacancyContext _db = new VacancyContext();
      return _db.Users.FirstOrDefault(u => u.Email == email);
    }

    public MembershipUser GetUser(object providerUserKey, bool userIsOnline)
    {
      //VacancyContext _db = new VacancyContext();
      var dbuser = _db.Users.FirstOrDefault(u => u.UserID == Convert.ToInt32(providerUserKey));
      if ((userIsOnline) && (dbuser != null))
      {
        dbuser.LaslLoginDate = DateTime.Now;
        _db.SaveChanges();
      }

      return getMembershipUserFromDBUser(dbuser);
    }

    public MembershipUserCollection FindUsersByName(string usernameToMatch, int pageIndex, int pageSize, out int totalRecords)
    {
      return FindUserByPredicate((x => x.UserName.IndexOf(usernameToMatch, StringComparison.OrdinalIgnoreCase) != 0),
        pageIndex, pageSize, out totalRecords);
    }

    public MembershipUserCollection FindUsersByEmail(string emailToMatch, int pageIndex, int pageSize, out int totalRecords)
    {
      return FindUserByPredicate((x => x.Email.IndexOf(emailToMatch, StringComparison.OrdinalIgnoreCase) != 0),
        pageIndex, pageSize, out totalRecords);
    }

    public bool ChangePassword(string username, string oldPassword, string newPassword)
    {
      //VacancyContext _db = new VacancyContext();
      var dbuser = _db.Users.SingleOrDefault(x => x.UserName.Equals(username, StringComparison.OrdinalIgnoreCase));
      if ((dbuser == null) || (!dbuser.Password.Equals(CreatePasswordHash(oldPassword, dbuser.PasswordSalt))))
        return false;
      dbuser.Password = CreatePasswordHash(oldPassword, dbuser.PasswordSalt);
      return true;
    }

    #endregion

    #region Roles

    public string[] GetRolesForUser(string username)
    {
      //VacancyContext _db = new VacancyContext();
      var user = _db.Users.FirstOrDefault(u => u.UserName == username);

      if (user != null)
      {
        var roles = from role in user.Roles
                    select role.Name;

        return roles.ToArray();
      }

      return new string[0];
    }

    public void AddRole(string roleName)
    {
      //VacancyContext _db = new VacancyContext();
      if (_db.Roles.SingleOrDefault(a => a.Name.Equals(roleName, StringComparison.OrdinalIgnoreCase)) == null)
      {
        _db.Roles.Add(new Role
        {
          RoleID = -1,
          Name = roleName,
        });
        _db.SaveChanges();
      }
    }

    public bool DeleteRole(string roleName, bool throwOnPopulatedRole)
    {
      //VacancyContext _db = new VacancyContext();
      var users = GetUsersInRole(roleName);
      if (throwOnPopulatedRole && users != null)
      {
        throw new Exception("OnPopulatedRole exception");
      }
      foreach (var user in _db.Users.Where(a => users.Any(x => x == a.UserName)))
      {
        user.Roles.Remove(user.Roles.Single(a => a.Name.Equals(roleName, StringComparison.OrdinalIgnoreCase)));
      }
      _db.Roles.Remove(_db.Roles.Single(a => a.Name.Equals(roleName, StringComparison.OrdinalIgnoreCase)));
      _db.SaveChanges();
      return true;
    }

    public IEnumerable<string> GetUsersInRole(string roleName)
    {
      //VacancyContext _db = new VacancyContext();
      return from a in _db.Users
             from role in a.Roles
             where role.Name.Equals(roleName, StringComparison.OrdinalIgnoreCase)
             select a.UserName;
    }

    public string[] GetAllRoles()
    {
      //VacancyContext _db = new VacancyContext();
      return (from role in _db.Roles
              select role.Name).ToArray();
    }

    public int GetRoleID(string roleName)
    {
      //VacancyContext _db = new VacancyContext();
      return _db.Roles.Single(a => a.Name.Equals(roleName, StringComparison.OrdinalIgnoreCase)).RoleID;
    }

    public bool IsUserInRole(string username, string roleName)
    {
      //VacancyContext _db = new VacancyContext();
      var user = _db.Users.FirstOrDefault(x => x.UserName.Equals(username));
      return user != null && user.Roles.Any(x => x.Name.Equals(roleName));
    }

    public bool RoleExists(string roleName)
    {
      //VacancyContext _db = new VacancyContext();
      return _db.Roles.Any(x => x.Name.Equals(roleName));
    }

    public void AddUsersToRoles(string[] usernames, string[] roleNames)
    {
      //VacancyContext _db = new VacancyContext();
      RoleAndUsers((user, rolename) =>
                     {
                       if (user.Roles.FirstOrDefault(x => x.Name.Equals(rolename)) == null)
                         user.Roles.Add(_db.Roles.Single(x => x.Name.Equals(rolename)));
                     }, usernames, roleNames);
    }

    public void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
    {
      //VacancyContext _db = new VacancyContext();
      RoleAndUsers((user, rolename) =>
      {
        if (user.Roles.FirstOrDefault(x => x.Name.Equals(rolename)) != null)
          user.Roles.Remove(_db.Roles.Single(x => x.Name.Equals(rolename)));
      }, usernames, roleNames);
    }

    public string[] FindUsersInRole(string roleName, string usernameToMatch)
    {
      //VacancyContext _db = new VacancyContext();
      return (from user in _db.Users.Where(x => x.UserName.IndexOf(usernameToMatch, StringComparison.OrdinalIgnoreCase) != 0) where user.Roles.Any(x => x.Name.Equals(roleName)) select user.UserName).ToArray();
    }

    #endregion

    #region Vacancy
    public List<Vacancy> CreateVacancy(string title, string description, DateTime? openingDate, string foreignLanguage, string requirments, bool isVisible)
    {
      //VacancyContext _db = new VacancyContext();
      var vacancies = new List<Vacancy>
                            {
                                new Vacancy
                                { VacancyID = -1,
                                  Title = title,
                                  Description = description,
                                  OpeningDate = openingDate,
                                  ForeignLanguage = foreignLanguage,
                                  Requirments = requirments,
                                  IsVisible = isVisible
                                }
                            };

      _db.Vacancies.Add(vacancies.ElementAt(0));
      _db.SaveChanges();
      //    Vacancies.Add(vacancy);

      return vacancies;

    }

    public void UpdateVacancy(int vacancyid, string title, string description, DateTime? openingDate, string foreignLanguage, string requirments, bool isVisible)
    {
      //VacancyContext _db = new VacancyContext();
      var update_rec = _db.Vacancies.SingleOrDefault(a => a.VacancyID == vacancyid);
      if (update_rec != null)
      {
        update_rec.Title = title;
        update_rec.Description = description;
        update_rec.OpeningDate = openingDate;
        update_rec.ForeignLanguage = foreignLanguage;
        update_rec.Requirments = requirments;
        update_rec.IsVisible = isVisible;
        _db.SaveChanges();
      }
    }

    public void DeleteVacancy(int vacancyid)
    {
      //VacancyContext _db = new VacancyContext();
      var delete_rec = _db.Vacancies.SingleOrDefault(a => a.VacancyID == vacancyid);
      if (delete_rec != null)
      {
        _db.Vacancies.Remove(delete_rec);
        _db.SaveChanges();
      }
    }

    #endregion VacancyRequirements

    #region VacancyRequirements
    public IEnumerable<VacancyRequirement> GetVacancyRequirements(int id)
    {
      //VacancyContext _db = new VacancyContext();
      return _db.VacancyRequirements.Where(vacancy_rec => vacancy_rec.VacancyID == id).ToList();
    }

    public void CreateVacancyRequirement(int vacancyid, int requirementid, string comments)
    {
      //VacancyContext _db = new VacancyContext();
      var vacancyrequirement = new VacancyRequirement
      {
        VacancyRequirementID = -1,
        VacancyID = vacancyid,
        RequirementID = requirementid,
        Comments = comments
      };

      _db.VacancyRequirements.Add(vacancyrequirement);
      _db.SaveChanges();
    }

    public void UpdateVacancyRequirement(int vacancyid, int requirementid, string comments)
    {
      //VacancyContext _db = new VacancyContext();
      var update_rec = _db.VacancyRequirements.Where(vacancy_rec => (vacancy_rec.VacancyID == vacancyid && vacancy_rec.RequirementID == requirementid)).SingleOrDefault();
      if (update_rec == null) return;
      update_rec.Comments = comments;
      _db.SaveChanges();
    }

    public void DeleteVacancyRequirement(int vacancyrequirementid)
    {
      //VacancyContext _db = new VacancyContext();
      var delete_rec = _db.VacancyRequirements.Where(vacancy_rec => vacancy_rec.VacancyRequirementID == vacancyrequirementid).SingleOrDefault();
      if (delete_rec == null) return;
      _db.VacancyRequirements.Remove(delete_rec);
      _db.SaveChanges();
    }

    #endregion

    #region RequirementStack

    public IEnumerable<RequirementStack> GetAllRequirementStacks()
    {
      //VacancyContext _db = new VacancyContext();
      return _db.RequirementStacks.ToList();
    }

    public int CreateRequirementStack(string name)
    {
      //VacancyContext _db = new VacancyContext();
      var requirementStack = new RequirementStack
      {
        Name = name,
        RequirementStackID = -1,
      };
      _db.RequirementStacks.Add(requirementStack);
      _db.SaveChanges();
      return _db.RequirementStacks.ToList()[_db.RequirementStacks.Count() - 1].RequirementStackID;
    }

    public void DeleteRequirementStack(int id)
    {
      //VacancyContext _db = new VacancyContext();
      var delete_rec = _db.RequirementStacks.SingleOrDefault(a => a.RequirementStackID == id);
      if (delete_rec == null) return;
      _db.RequirementStacks.Remove(delete_rec);
      _db.SaveChanges();
    }

    public void UpdateRequirementStack(int id, string name)
    {
      //VacancyContext _db = new VacancyContext();
      var update_rec = _db.RequirementStacks.SingleOrDefault(a => a.RequirementStackID == id);
      if (update_rec != null)
      {
        update_rec.Name = name;
        _db.SaveChanges();
      }
    }
    #endregion

    #region Requirement
    public IEnumerable<Requirement> GetRequirements()
    {
      //VacancyContext _db = new VacancyContext();
      return _db.Requirements.ToList();
    }

    public IEnumerable<Requirement> GetAllRequirements(int id)
    {
      //VacancyContext _db = new VacancyContext();
      return _db.RequirementStacks.FirstOrDefault(x => x.RequirementStackID == id).Requirements.ToList();
    }

    public int CreateRequirement(int id, string name)
    {
      //VacancyContext _db = new VacancyContext();
      var requirement = new Requirement
      {
        Name = name,
        RequirementStackID = id,
        RequirementID = -1,
      };
      _db.Requirements.Add(requirement);
      _db.SaveChanges();
      return _db.Requirements.ToList()[_db.Requirements.Count() - 1].RequirementID;
    }

    public void DeleteRequirement(int id)
    {
      //VacancyContext _db = new VacancyContext();
      var delete_rec = _db.Requirements.SingleOrDefault(a => a.RequirementID == id);
      if (delete_rec == null) return;
      _db.Requirements.Remove(delete_rec);
      _db.SaveChanges();
    }

    public void UpdateRequirement(int id, string name)
    {
      //VacancyContext _db = new VacancyContext();
      var update_rec = _db.Requirements.SingleOrDefault(a => a.RequirementID == id);
      if (update_rec == null) return;
      update_rec.Name = name;
      _db.SaveChanges();
    }
    #endregion

    public void Dispose()
    {
      _db.Dispose();
    }

    #region Private methods

    private static string CreateSalt()
    {
      var rng = new RNGCryptoServiceProvider();
      var buff = new byte[32];

      rng.GetBytes(buff);

      return Convert.ToBase64String(buff);
    }

    private static string CreatePasswordHash(string password, string salt)
    {
      string passwordAndSalt = String.Concat(password, salt);
      string hashedPassword = FormsAuthentication.HashPasswordForStoringInConfigFile(passwordAndSalt, "md5");

      return hashedPassword;
    }

    private static string GenerateKey()
    {
      Guid emailKey = Guid.NewGuid();
      return emailKey.ToString();
    }

    //Why? DRY
    private void RoleAndUsers(Action<User, string> act, IEnumerable<string> usernames, string[] roleNames)
    {
      //VacancyContext _db = new VacancyContext();
      foreach (var username in usernames)
      {
        var user = _db.Users.FirstOrDefault(x => x.UserName.Equals(username));
        if (user == null) continue;
        foreach (var rolename in roleNames)
        {
          act(user, rolename);
        }
      }
      _db.SaveChanges();
    }

    private MembershipUser getMembershipUserFromDBUser(User dbuser)
    {
      if (dbuser != null)
      {
        string dbusername = dbuser.UserName;
        int providerUserKey = dbuser.UserID;
        string email = dbuser.Email;
        string passwordQuestion = string.Empty;
        string comment = dbuser.UserComment;
        string lastLockedOutReason = dbuser.LastLockedOutReason;
        bool isApproved = dbuser.IsActivated;
        bool isLockedOut = dbuser.IsLockedOut;
        DateTime creationDate = dbuser.CreateDate;
        DateTime lastLoginDate = dbuser.LaslLoginDate;
        DateTime lastActivityDate = DateTime.Now;
        DateTime lastPasswordChangedDate = DateTime.Now;
        DateTime lastLockedOutDate = dbuser.LastLockedOutDate;
        string emailKey = dbuser.EmailKey;

        var user = new VMMembershipUser("VacancyManagerMembershipProvider",
                                      dbusername,
                                      providerUserKey,
                                      email,
                                      passwordQuestion,
                                      comment,
                                      lastLockedOutReason,
                                      isApproved,
                                      isLockedOut,
                                      creationDate,
                                      lastLoginDate,
                                      lastActivityDate,
                                      lastPasswordChangedDate,
                                      lastLockedOutDate,
                                      emailKey);

        return user;
      }

      return null;
    }

    private MembershipUserCollection FindUserByPredicate(Func<User, bool> predicate, int pageIndex, int pageSize, out int totalRecords)
    {
      MembershipUserCollection result = new MembershipUserCollection();
      int index = 0;
      int from = pageIndex * pageSize;
      int to = (pageIndex + 1) * pageSize;
      //VacancyContext _db = new VacancyContext();
      foreach (var user in _db.Users.Where(predicate))
      {
        index++;
        if ((index > from) && (index <= to))
          result.Add(getMembershipUserFromDBUser(user));
      }
      totalRecords = index;
      return result;
    }

    #endregion
  }
}