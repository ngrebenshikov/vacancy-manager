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
        private readonly VacancyContext _db = new VacancyContext();

        public IEnumerable<Vacancy> AllVisibleVacancies()
        {
            return _db.Vacancies.Where(vacancy => vacancy.IsVisible).ToList();
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
                           IsActivated = true, // TODO Временное решение. По мере развития необходимо изменить
                           IsLockedOut = false,
                           LastLockedOutDate = DateTime.Now,
                           LaslLoginDate = DateTime.Now,
                           Comments = new Collection<Comment>(),
                           Considerations = new Collection<Consideration>(),
                           Resumes = new Collection<Resume>(),
                           Files = new Collection<File>(),
                       };
            user.Password = CreatePasswordHash(password, user.PasswordSalt);

            _db.Users.Add(user);
            _db.SaveChanges();
        }

        public bool ValidateUser(string username, string password)
        {
            var dbuser = _db.Users.FirstOrDefault(u => u.UserName == username);

            return dbuser != null && dbuser.Password == CreatePasswordHash(password, dbuser.PasswordSalt);
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

        #region TechStack

        public IEnumerable<TechnologyStack> GetAllTechStacks()
        {
          return _db.TechnologyStacks.ToList();
        }

        public void CreateTechStack(string name)
        {
          var techStack = new TechnologyStack
          {
            Name = name,
            TechnologyStackID = -1,
          };
          _db.TechnologyStacks.Add(techStack);
          _db.SaveChanges();
        }

        public void DeleteTechStack(int id)
        {
          var delete_rec = _db.TechnologyStacks.Where(a => a.TechnologyStackID == id).SingleOrDefault();
          if (delete_rec != null)
          {
            _db.TechnologyStacks.Remove(delete_rec);
            _db.SaveChanges();
          }
        }

        public void UpdateTechStack(int id, string name)
        {
          var update_rec = _db.TechnologyStacks.Where(a => a.TechnologyStackID == id).SingleOrDefault();
          if (update_rec != null)
          {
            update_rec.Name=name;
            _db.SaveChanges();
          }
        }
        #endregion

 #region User
        public void AdminCreateUser(string userName, string email, string password, string userComment, DateTime createDate, DateTime laslLoginDate, bool isActivated, bool isLockedOut, DateTime lastLockedOutDate, string LastLockedOutReason, string emailKey)
        {
            var user = new User
            {
                UserID=-1,
                UserName = userName,
                Email=email,
                Password=password,
                UserComment=userComment,
                CreateDate=createDate,
                LaslLoginDate = laslLoginDate,
                IsActivated=isActivated,
                IsLockedOut=isLockedOut,
                LastLockedOutDate=lastLockedOutDate,
                LastLockedOutReason=LastLockedOutReason,
                EmailKey=emailKey
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
                update_user.Email=email;
                update_user.Password=password;
                update_user.UserComment=userComment;
                update_user.CreateDate=createDate;
                update_user.LaslLoginDate = laslLoginDate;
                update_user.IsActivated=isActivated;
                update_user.IsLockedOut=isLockedOut;
                update_user.LastLockedOutDate=lastLockedOutDate;
                update_user.LastLockedOutReason=LastLockedOutReason;
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


        #region Technology

        public IEnumerable<Technology> GetAllTechnologies(int id)
        {
          return _db.TechnologyStacks.FirstOrDefault(x=>x.TechnologyStackID==id).Technologies.ToList();
        }

        public void CreateTechnology(int id,string name)
        {
          var tech = new Technology
          {
            Name = name,
            TechnologyStackID=id,
            TechnologyID = -1,
          };
          _db.Technologies.Add(tech);
          _db.SaveChanges();
        }

        public void DeleteTechnology(int id)
        {
          var delete_rec = _db.Technologies.Where(a => a.TechnologyID == id).SingleOrDefault();
          if (delete_rec != null)
          {
            _db.Technologies.Remove(delete_rec);
            _db.SaveChanges();
          }
        }

        public void UpdateTechnology(int id, string name)
        {
          var update_rec = _db.Technologies.Where(a => a.TechnologyID == id).SingleOrDefault();
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

        #endregion
    }
}