using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web.Hosting;
using System.Web.Security;
using VacancyManager.Models;

namespace VacancyManager.Services
{
  public class VacancyManagerRoleProvider : RoleProvider
  {

    public override string ApplicationName { get; set; }

    public override void Initialize(string name, NameValueCollection config)
    {
      base.Initialize(name, config);
      ApplicationName = GetConfigValue(config["applicationName"], HostingEnvironment.ApplicationVirtualPath);
    }

    public override bool IsUserInRole(string username, string roleName)
    {
      VacancyContext _db = new VacancyContext();
      var user = _db.Users.FirstOrDefault(x => x.UserName.Equals(username));
      return user != null && user.Roles.Any(x => x.Name.Equals(roleName));
    }

    public override string[] GetRolesForUser(string username)
    {
      VacancyContext _db = new VacancyContext();
      var user = _db.Users.FirstOrDefault(u => u.UserName == username);

      if (user != null)
      {
        var roles = from role in user.Roles
                    select role.Name;

        return roles.ToArray();
      }

      return new string[0];
    }

    public override void CreateRole(string roleName)
    {
      VacancyContext _db = new VacancyContext();
      if (_db.Roles.SingleOrDefault(a => a.Name.Equals(roleName, StringComparison.OrdinalIgnoreCase)) != null)
        return;

      _db.Roles.Add(new Role
                      {
                        RoleID = -1,
                        Name = roleName,
                      });
      _db.SaveChanges();
    }

    public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
    {
      VacancyContext _db = new VacancyContext();
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

    public override bool RoleExists(string roleName)
    {
      return new VacancyContext().Roles.Any(x => x.Name.Equals(roleName));
    }

    public override void AddUsersToRoles(string[] usernames, string[] roleNames)
    {
      RoleAndUsers((db, user, rolename) =>
      {
        if (user.Roles.FirstOrDefault(x => x.Name.Equals(rolename)) == null)
          user.Roles.Add(db.Roles.Single(x => x.Name.Equals(rolename)));
      }, usernames, roleNames);
    }

    public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
    {
      RoleAndUsers((db, user, rolename) =>
      {
        if (user.Roles.FirstOrDefault(x => x.Name.Equals(rolename)) != null)
          user.Roles.Remove(db.Roles.Single(x => x.Name.Equals(rolename)));
      }, usernames, roleNames);
    }

    public override string[] GetUsersInRole(string roleName)
    {
      VacancyContext _db = new VacancyContext();
      return (from a in _db.Users
              from role in a.Roles
              where role.Name.Equals(roleName, StringComparison.OrdinalIgnoreCase)
              select a.UserName).ToArray();
    }

    public override string[] GetAllRoles()
    {
      VacancyContext _db = new VacancyContext();
      return (from role in _db.Roles
              select role.Name).ToArray();
    }

    public override string[] FindUsersInRole(string roleName, string usernameToMatch)
    {
      VacancyContext _db = new VacancyContext();
      return (from user in _db.Users.Where(x => x.UserName.IndexOf(usernameToMatch, StringComparison.OrdinalIgnoreCase) != 0)
              where user.Roles.Any(x => x.Name.Equals(roleName))
              select user.UserName).ToArray();
    }

    #region Private methods

    private string GetConfigValue(string configValue, string defaultValue)
    {
      return (string.IsNullOrEmpty(configValue)) ? defaultValue : configValue;
    }

    //Why? DRY
    private void RoleAndUsers(Action<VacancyContext, User, string> act, IEnumerable<string> usernames, string[] roleNames)
    {
      VacancyContext _db = new VacancyContext();
      foreach (var username in usernames)
      {
        var user = _db.Users.FirstOrDefault(x => x.UserName.Equals(username));
        if (user == null) continue;
        foreach (var rolename in roleNames)
        {
          act(_db, user, rolename);
        }
      }
      _db.SaveChanges();
    }

    #endregion
  }
}