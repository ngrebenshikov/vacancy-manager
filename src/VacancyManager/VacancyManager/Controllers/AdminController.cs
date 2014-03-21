using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Services;

namespace VacancyManager.Controllers
{
    [AuthorizeError(Roles = "Admin")]
    public class AdminController : BaseController
    {

    }
}
