using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Vacan.Models;

namespace Vacan.Controllers
{
  public class HomeController : Controller
  {
    private VacancyDBContext db = new VacancyDBContext();

    public ActionResult Index()
    {
      ViewBag.Message = "Список вакансий";

      return View(db.Vacancies.ToList());
    }

    public ViewResult Details(int id)
    {
      Vacancy vacancy = db.Vacancies.Find(id);
      return View(vacancy);
    }
  }
}
