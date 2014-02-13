using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using prjFactVakancies.Models;
using System.Web.Mvc;

namespace prjFactVakancies.Controllers
{
    public class VakancyController : Controller
    {
        //
        // GET: /Vakancy/
        VakancyContext db = new VakancyContext();

        public ActionResult Index()
        {
            return View(db.Vakancies);
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(Vakancy newVakancy)
        {
            try
            {
                db.Vakancies.Add(newVakancy);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            catch
            {
                return View();  
            }
        }

        public ActionResult Edit(int id)
        {
           return View(db.Vakancies.Find(id));
        }

        [HttpPost]
        public ActionResult Edit(int id, Vakancy Vakancy)
        {
            db.Entry(Vakancy).State = System.Data.EntityState.Modified;
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult Delete(int id)
        {
            return View(db.Vakancies.Find(id));
        }

        [HttpPost]
        public ActionResult Delete(int id, Vakancy Vakancy)
        {
            db.Entry(Vakancy).State = System.Data.EntityState.Deleted;
            db.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}
