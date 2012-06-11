using System;
using System.Collections.Generic;
using System.Web.Security;
using VacancyManager.Models;

namespace VacancyManager.Services
{
  public interface IRepository : IDisposable
  {
    IEnumerable<Vacancy> AllVisibleVacancies();
    //IEnumerable<User> AllUsers();
    User GetUserByEmail(string email);
    //User GetUserByUsername(string username);
    MembershipUser GetMembershipUserByUserName(string username);
    void UpdateMembershipUser(MembershipUser user);
    bool UnlockMembershipUser(string userName);
    #region Vacancy
    List<Vacancy> CreateVacancy(string title, string description, DateTime? openingDate, string foreignLanguage, string requirments, bool isVisible);
    void UpdateVacancy(int vacancyid, string title, string description, DateTime? openingDate, string foreignLanguage, string requirments, bool isVisible);
    void DeleteVacancy(int vacancyid);
    #endregion

    #region VacancyRequirement
    IEnumerable<VacancyRequirement> GetVacancyRequirements(int id);
    void CreateVacancyRequirement(int vacancyid, int requirementid, string comments);
    void UpdateVacancyRequirement(int vacancyid, int requirementid, string comments);
    void DeleteVacancyRequirement(int vacancyrequirementid);
    #endregion

    #region RequirementStack
    IEnumerable<RequirementStack> GetAllRequirementStacks();
    int CreateRequirementStack(string name);
    void DeleteRequirementStack(int id);
    void UpdateRequirementStack(int id, string name);
    #endregion
    #region Requirement
    IEnumerable<Requirement> GetAllRequirements(int id);
    IEnumerable<Requirement> GetRequirements();
    int CreateRequirement(int id, string name);
    void DeleteRequirement(int id);
    void UpdateRequirement(int id, string name);
    #endregion
    void CreateUser(string username, string password, string email);
    bool ValidateUser(string username, string password);
    //bool ActivateUser(string username, string key);

    void AddRole(string roleName);

    bool DeleteRole(string roleName, bool throwOnPopulatedRole);

    IEnumerable<string> GetUsersInRole(string roleName);

    string[] GetAllRoles();
    int GetRoleID(string roleName);
    MembershipUserCollection GetAllUsers();
    bool DeleteUser(string username, bool deleteAllRelatedData);
    bool IsUserInRole(string username, string roleName);
    bool RoleExists(string roleName);
    void AddUsersToRoles(string[] usernames, string[] roleNames);
    void RemoveUsersFromRoles(string[] usernames, string[] roleNames);
    string[] FindUsersInRole(string roleName, string usernameToMatch);
    MembershipUser GetUser(object providerUserKey, bool userIsOnline);
    MembershipUserCollection FindUsersByName(string usernameToMatch, int pageIndex, int pageSize, out int totalRecords);
    MembershipUserCollection FindUsersByEmail(string emailToMatch, int pageIndex, int pageSize, out int totalRecords);
    bool ChangePassword(string username, string oldPassword, string newPassword);
    string[] GetRolesForUser(string username);
  }
}