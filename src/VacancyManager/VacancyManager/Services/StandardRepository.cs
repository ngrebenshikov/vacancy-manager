using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Web.Security;
using VacancyManager.Models;

namespace VacancyManager.Services
{
  class StandardRepository : IRepository
  {
    private readonly VacancyContext _db = new VacancyContext();

    public IEnumerable<Vacancy> AllVisibleVacancies()
    {
      return _db.Vacancies.Where(vacancy => vacancy.IsVisible).ToList();
    }

    public IEnumerable<User> AllUsers()
    {
      return _db.Users.ToList();
    }

    public User GetUserByEmail(string email)
    {
      return _db.Users.FirstOrDefault(u => u.Email == email);
    }

    public User GetUserByUsername(string username)
    {
      return _db.Users.FirstOrDefault(u => u.UserName == username);
    }

    public MembershipUser GetMembershipUserByUserName(string username)
    {
      var dbuser = _db.Users.FirstOrDefault(u => u.UserName == username);

      if (dbuser != null)
      {
        string dbusername = dbuser.UserName;
        int providerUserKey = dbuser.UserID;
        string email = dbuser.Email;
        string passwordQuestion = string.Empty;
        string comment = dbuser.UserComment;
        bool isApproved = dbuser.IsActivated;
        bool isLockedOut = dbuser.IsLockedOut;
        DateTime creationDate = dbuser.CreateDate;
        DateTime lastLoginDate = dbuser.LaslLoginDate;
        DateTime lastActivityDate = DateTime.Now;
        DateTime lastPasswordChangedDate = DateTime.Now;
        DateTime lastLockedOutDate = dbuser.LastLockedOutDate;

        var user = new MembershipUser("VacancyManagerMembershipProvider",
                                      dbusername,
                                      providerUserKey,
                                      email,
                                      passwordQuestion,
                                      comment,
                                      isApproved,
                                      isLockedOut,
                                      creationDate,
                                      lastLoginDate,
                                      lastActivityDate,
                                      lastPasswordChangedDate,
                                      lastLockedOutDate);

        return user;
      }

      return null;
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
      //Пока не знаю куда поставить отправку письма, пусть пока тут будет
      string ActivationLink = "http://localhost:53662/Account/Activate/" +
                                  user.UserName + "/" + user.EmailKey;
      var message = new MailMessage("StudVacancyProject@mail.ru", user.Email)
      {
        Subject = "Activate your account",
        Body = ActivationLink
      };
      var client = new SmtpClient("smtp.mail.ru");
      client.Credentials = new System.Net.NetworkCredential("StudVacancyProject", "StudVacancyProject!");
      client.Send(message);

      _db.Users.Add(user);
      _db.SaveChanges();
    }

    public bool ValidateUser(string username, string password)
    {
      var dbuser = _db.Users.FirstOrDefault(u => u.UserName == username);

      return dbuser != null && dbuser.Password == CreatePasswordHash(password, dbuser.PasswordSalt) && dbuser.IsActivated && !dbuser.IsLockedOut;
    }

    public bool ActivateUser(string username, string key)
    {
      var dbusers = _db.Users.Where(elem => elem.UserName == username);
      if (dbusers.Count() != 0)
      {
        var dbuser = dbusers.First();
        if (dbuser.EmailKey == key)
        {
          dbuser.IsActivated = true;//Активировали
          dbuser.IsLockedOut = false;
          dbuser.EmailKey = null;//Чтобы нельзя было больше активировать
          _db.SaveChanges();
          return true;
        }
        else
        {
          return false;
        }
      }
      return false;
    }

    #region Vacancy
    public void CreateVacancy(string title, string description, DateTime? openingDate, string foreignLanguage, string requirments, bool isVisible)
    {
      var vacancy = new Vacancy
      {
        VacancyID = -1,
        Title = title,
        Description = description,
        OpeningDate = openingDate,
        ForeignLanguage = foreignLanguage,
        Requirments = requirments,
        IsVisible = isVisible,

      };

      _db.Vacancies.Add(vacancy);
      _db.SaveChanges();
    }

    public void UpdateVacancy(int vacancyid, string title, string description, DateTime? openingDate, string foreignLanguage, string requirments, bool isVisible)
    {
      var update_rec = _db.Vacancies.Where(a => a.VacancyID == vacancyid).SingleOrDefault();
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
      var delete_rec = _db.Vacancies.Where(a => a.VacancyID == vacancyid).SingleOrDefault();
      if (delete_rec != null)
      {
        _db.Vacancies.Remove(delete_rec);
        _db.SaveChanges();
      }
    }
    #endregion

    #region RequirementStack

    public IEnumerable<RequirementStack> GetAllRequirementStacks()
    {
      return _db.RequirementStacks.ToList();
    }

    public int CreateRequirementStack(string name)
    {
      var requirementStack = new RequirementStack
      {
        Name = name,
        RequirementStackID = -1,
      };
      _db.RequirementStacks.Add(requirementStack);
      _db.SaveChanges();
      return _db.RequirementStacks.ToList()[_db.RequirementStacks.ToList().Count - 1].RequirementStackID;
    }

    public void DeleteRequirementStack(int id)
    {
      var delete_rec = _db.RequirementStacks.Where(a => a.RequirementStackID == id).SingleOrDefault();
      if (delete_rec != null)
      {
        _db.RequirementStacks.Remove(delete_rec);
        _db.SaveChanges();
      }
    }

    public void UpdateRequirementStack(int id, string name)
    {
      var update_rec = _db.RequirementStacks.Where(a => a.RequirementStackID == id).SingleOrDefault();
      if (update_rec != null)
      {
        update_rec.Name = name;
        _db.SaveChanges();
      }
    }
    #endregion

    #region User
    public void AdminCreateUser(string userName, string email, string password, string userComment, DateTime createDate, DateTime laslLoginDate, bool isActivated, bool isLockedOut, DateTime lastLockedOutDate, string LastLockedOutReason, string emailKey)
    {
      var user = new User
      {
        UserID = -1,
        UserName = userName,
        Email = email,
        Password = password,
        UserComment = userComment,
        CreateDate = createDate,
        LaslLoginDate = laslLoginDate,
        IsActivated = isActivated,
        IsLockedOut = isLockedOut,
        LastLockedOutDate = lastLockedOutDate,
        LastLockedOutReason = LastLockedOutReason,
        EmailKey = emailKey
      };

      _db.Users.Add(user);
      _db.SaveChanges();
    }

    public void AdminUpdateUser(int userID, string userName, string email, string password, string userComment, DateTime createDate, DateTime laslLoginDate, bool isActivated, bool isLockedOut, DateTime lastLockedOutDate, string LastLockedOutReason, string emailKey)
    {
      var update_user = _db.Users.Where(a => a.UserID == userID).SingleOrDefault();
      if (update_user != null)
      {
        update_user.UserName = userName;
        update_user.Email = email;
        update_user.Password = password;
        update_user.UserComment = userComment;
        update_user.CreateDate = createDate;
        update_user.LaslLoginDate = laslLoginDate;
        update_user.IsActivated = isActivated;
        update_user.IsLockedOut = isLockedOut;
        update_user.LastLockedOutDate = lastLockedOutDate;
        update_user.LastLockedOutReason = LastLockedOutReason;
        update_user.EmailKey = emailKey;
        _db.SaveChanges();
      }
    }

    public void AdminDeleteUser(int userID)
    {
      var delete_user = _db.Users.Where(a => a.UserID == userID).SingleOrDefault();
      if (delete_user != null)
      {
        _db.Users.Remove(delete_user);
        _db.SaveChanges();
      }
    }
    #endregion

    #region Requirement

    public IEnumerable<Requirement> GetAllRequirements(int id)
    {
      return _db.RequirementStacks.FirstOrDefault(x => x.RequirementStackID == id).Requirements.ToList();
    }

    public int CreateRequirement(int id, string name)
    {
      var requirement = new Requirement
      {
        Name = name,
        RequirementStackID = id,
        RequirementID = -1,
      };
      _db.Requirements.Add(requirement);
      _db.SaveChanges();
      return _db.Requirements.ToList()[_db.Requirements.ToList().Count - 1].RequirementID;
    }

    public void DeleteRequirement(int id)
    {
      var delete_rec = _db.Requirements.Where(a => a.RequirementID == id).SingleOrDefault();
      if (delete_rec != null)
      {
        _db.Requirements.Remove(delete_rec);
        _db.SaveChanges();
      }
    }

    public void UpdateRequirement(int id, string name)
    {
      var update_rec = _db.Requirements.Where(a => a.RequirementID == id).SingleOrDefault();
      if (update_rec != null)
      {
        update_rec.Name = name;
        _db.SaveChanges();
      }
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

    #endregion

  }
}