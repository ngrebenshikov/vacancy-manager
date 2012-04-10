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
            return _db.Vacancies.Where(vacancy => vacancy.IsVisible);
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
          return _db.RequirementStacks.ToList()[_db.RequirementStacks.ToList().Count-1].RequirementStackID;
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
            update_rec.Name=name;
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

        #endregion
    }
}