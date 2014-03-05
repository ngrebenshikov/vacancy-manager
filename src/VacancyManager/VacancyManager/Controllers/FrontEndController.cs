using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Services;

namespace VacancyManager.Controllers
{
    public class FrontEndController : BaseController
    {
        // GET: /FrontEnd/

        public ActionResult Index()
        {
            return View();
        }

    }
}
