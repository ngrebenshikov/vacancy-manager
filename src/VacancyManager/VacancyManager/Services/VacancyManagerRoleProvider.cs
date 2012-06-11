using System.Collections.Specialized;
using System.Linq;
using System.Web.Hosting;
using System.Web.Security;
using Ninject;

namespace VacancyManager.Services
{
  public class VacancyManagerRoleProvider : RoleProvider
  {
    [Inject]
    public IRepository Repository { get; set; }

    public override string ApplicationName { get; set; }

    public override void Initialize(string name, NameValueCollection config)
    {
      base.Initialize(name, config);
      ApplicationName = GetConfigValue(config["applicationName"], HostingEnvironment.ApplicationVirtualPath);
    }

    public override bool IsUserInRole(string username, string roleName)
    {
      return Repository.IsUserInRole(username, roleName);
    }

    public override string[] GetRolesForUser(string username)
    {
      return Repository.GetRolesForUser(username);
    }

    public override void CreateRole(string roleName)
    {
      Repository.AddRole(roleName);
    }

    public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
    {
      return Repository.DeleteRole(roleName, throwOnPopulatedRole);
    }

    public override bool RoleExists(string roleName)
    {
      return Repository.RoleExists(roleName);
    }

    public override void AddUsersToRoles(string[] usernames, string[] roleNames)
    {
      Repository.AddUsersToRoles(usernames, roleNames);
    }

    public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
    {
      Repository.RemoveUsersFromRoles(usernames, roleNames);
    }

    public override string[] GetUsersInRole(string roleName)
    {
      return Repository.GetUsersInRole(roleName).ToArray();
    }

    public override string[] GetAllRoles()
    {
      return Repository.GetAllRoles();
    }

    public override string[] FindUsersInRole(string roleName, string usernameToMatch)
    {
      return Repository.FindUsersInRole(roleName, usernameToMatch);
    }

    #region Private methods

    private string GetConfigValue(string configValue, string defaultValue)
    {
      return (string.IsNullOrEmpty(configValue)) ? defaultValue : configValue;
    }

    #endregion
  }
}