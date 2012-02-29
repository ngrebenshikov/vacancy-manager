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

        public string Index()
        {
            // Простейший запрос к контексту, т.к. без этого база данных автоматически не создаётся
            return db.Applicants.Any().ToString(CultureInfo.InvariantCulture);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}