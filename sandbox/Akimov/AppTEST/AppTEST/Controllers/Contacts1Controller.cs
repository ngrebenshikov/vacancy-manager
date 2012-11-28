using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AppTEST.Models;
using MVC3AppCodeFirst.Models;

namespace AppTEST.Controllers
{ 
    public class Contacts1Controller : Controller
    {
        private AppTESTContext db = new AppTESTContext();

        //
        // GET: /Contacts1/

        public ViewResult Index()
        {
            return View(db.Contacts.ToList());
        }

        //
        // GET: /Contacts1/Details/5

        public ViewResult Details(int id)
        {
            Contacts1 contacts1 = db.Contacts.Find(id);
            return View(contacts1);
        }

        //
        // GET: /Contacts1/Create

        public ActionResult Create()
        {
            return View();
        } 

        //
        // POST: /Contacts1/Create

        [HttpPost]
        public ActionResult Create(Contacts1 contacts1)
        {
            if (ModelState.IsValid)
            {
                db.Contacts.Add(contacts1);
                db.SaveChanges();
                return RedirectToAction("Index");  
            }

            return View(contacts1);
        }
        
        //
        // GET: /Contacts1/Edit/5
 
        public ActionResult Edit(int id)
        {
            Contacts1 contacts1 = db.Contacts.Find(id);
            return View(contacts1);
        }

        //
        // POST: /Contacts1/Edit/5

        [HttpPost]
        public ActionResult Edit(Contacts1 contacts1)
        {
            if (ModelState.IsValid)
            {
                db.Entry(contacts1).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(contacts1);
        }

        //
        // GET: /Contacts1/Delete/5
 
        public ActionResult Delete(int id)
        {
            Contacts1 contacts1 = db.Contacts.Find(id);
            return View(contacts1);
        }

        //
        // POST: /Contacts1/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {            
            Contacts1 contacts1 = db.Contacts.Find(id);
            db.Contacts.Remove(contacts1);
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