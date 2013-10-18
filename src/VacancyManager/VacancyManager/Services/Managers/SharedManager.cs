using System;
using System.Linq;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{
  internal static class SharedManager
  {
    internal static int GetRoleID(string roleName)
    {
      VacancyContext _db = new VacancyContext();
      return _db.Roles.Single(a => a.Name.Equals(roleName, StringComparison.OrdinalIgnoreCase)).RoleID;
    }

  }
}