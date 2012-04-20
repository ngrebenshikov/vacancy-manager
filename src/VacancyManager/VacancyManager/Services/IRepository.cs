using System;
using System.Collections.Generic;
using System.Web.Security;
using VacancyManager.Models;
using System.Linq;

namespace VacancyManager.Services
{
  public interface IRepository : IDisposable
  {
    IEnumerable<Vacancy> AllVisibleVacancies();
    IEnumerable<User> AllUsers();
    User GetUserByEmail(string email);
    User GetUserByUsername(string username);
    MembershipUser GetMembershipUserByUserName(string username);
    #region Vacancy
    void CreateVacancy(string title, string description, DateTime? openingDate, string foreignLanguage, string requirments, bool isVisible);
    void UpdateVacancy(int vacancyid, string title, string description, DateTime? openingDate, string foreignLanguage, string requirments, bool isVisible);
    void DeleteVacancy(int vacancyid);
    #endregion
    #region RequirementStack
    IEnumerable<RequirementStack> GetAllRequirementStacks();
    int CreateRequirementStack(string name);
    void DeleteRequirementStack(int id);
    void UpdateRequirementStack(int id, string name);
    #endregion
    #region User
    void AdminCreateUser(string userName, string email, string password, string userComment, DateTime createDate, DateTime laslLoginDate, bool isActivated, bool isLockedOut, DateTime lastLockedOutDate, string LastLockedOutReason, string emailKey);
    void AdminUpdateUser(int userID, string userName, string email, string password, string userComment, DateTime createDate, DateTime laslLoginDate, bool isActivated, bool isLockedOut, DateTime lastLockedOutDate, string LastLockedOutReason, string emailKey);
    void AdminDeleteUser(int userID);
    #endregion
    #region Requirement
    IEnumerable<Requirement> GetAllRequirements(int id);
    int CreateRequirement(int id, string name);
    void DeleteRequirement(int id);
    void UpdateRequirement(int id, string name);
    #endregion
    void CreateUser(string username, string password, string email);
    bool ValidateUser(string username, string password);
    bool ActivateUser(string username, string key);
  }
}