using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Vacan.Models;

namespace Vacan.Controllers
{
  public class VacancyController : Controller
  {
    public VacancyDBContext db = new VacancyDBContext();

    //
    // GET: /Vacancy/

    public ViewResult Index()
    {
      return View(db.Vacancies.ToList());
    }

    //
    // GET: /Vacancy/Details/5

    public ViewResult Details(int id)
    {
      Vacancy vacancy = db.Vacancies.Find(id);
      return View(vacancy);
    }

    //
    // GET: /Vacancy/Create

    public ActionResult Create()
    {
      return View();
    }

    //
    // POST: /Vacancy/Create

    [HttpPost]
    public ActionResult Create(Vacancy vacancy)
    {
      if (ModelState.IsValid)
      {
        db.Vacancies.Add(vacancy);
        db.SaveChanges();
        return RedirectToAction("Index");
      }

      return View(vacancy);
    }

    //
    // GET: /Vacancy/Edit/5

    public ActionResult Edit(int id)
    {
      Vacancy vacancy = db.Vacancies.Find(id);
      return View(vacancy);
    }

    //
    // POST: /Vacancy/Edit/5

    [HttpPost]
    public ActionResult Edit(Vacancy vacancy)
    {
      if (ModelState.IsValid)
      {
        db.Entry(vacancy).State = EntityState.Modified;
        db.SaveChanges();
        return RedirectToAction("Index");
      }
      return View(vacancy);
    }

    //
    // GET: /Vacancy/Delete/5

    public ActionResult Delete(int id)
    {
      Vacancy vacancy = db.Vacancies.Find(id);
      return View(vacancy);
    }

    //
    // POST: /Vacancy/Delete/5

    [HttpPost, ActionName("Delete")]
    public ActionResult DeleteConfirmed(int id)
    {
      Vacancy vacancy = db.Vacancies.Find(id);
      db.Vacancies.Remove(vacancy);
      db.SaveChanges();
      return RedirectToAction("Index");
    }

    protected override void Dispose(bool disposing)
    {
      db.Dispose();
      base.Dispose(disposing);
    }
  }
}