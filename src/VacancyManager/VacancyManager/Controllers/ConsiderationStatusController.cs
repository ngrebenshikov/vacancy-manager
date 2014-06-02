using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Models;
using VacancyManager.Services.Managers;

namespace VacancyManager.Controllers
{
    public class ConsiderationStatusController : AdminController
    {
        //
        // GET: /ConsiderationStatus/
        [HttpGet]
        public JsonResult Load()
        {
            List<ConsiderationStatus> statuses = ConsiderationsManager.GetConsiderationStatuses().ToList();
            return Json(new
            {
                data = statuses,
                total = statuses.Count,
                success = true
            },
            JsonRequestBehavior.AllowGet);
        }

    }
}
