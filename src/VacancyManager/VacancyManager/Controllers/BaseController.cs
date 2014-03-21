using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Services;
using VacancyManager.Models;
using VacancyManager.Services.Managers;
using System.Web.Security;

namespace VacancyManager.Controllers
{
    [ExceptionErrorAttribute]
    public class BaseController : Controller
    {
        public bool UserCanExecuteAction
        {
            get
            {
               bool AllActions = true;
               if (OnlineUserRoles == "User")
                   AllActions = false;
               return AllActions;
            }
        }

        public string OnlineUserRoles
        {
            get  {
                return String.Join(",", Roles.GetRolesForUser(), 0, Roles.GetRolesForUser().Count());
            }
        }


    }
}
