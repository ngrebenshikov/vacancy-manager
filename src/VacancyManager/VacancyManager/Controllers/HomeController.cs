using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Models;

namespace VacancyManager.Controllers
{ 
    public class HomeController : Controller
    {
        private readonly VacancyContext db = new VacancyContext();

        //
        // GET: /Home/

        public ActionResult Index()
        {
            var vacancyList = from vacancy in db.Vacancies
                              where vacancy.IsVisible
                              select vacancy;

            return View(vacancyList);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}