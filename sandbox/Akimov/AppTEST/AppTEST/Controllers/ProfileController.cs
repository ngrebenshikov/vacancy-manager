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
    public class ProfileController : Controller
    {
        private AppTESTContext db = new AppTESTContext();

        //
        // GET: /Profile/

        public ViewResult Index()
        {
            return View(db.Posts.ToList());
        }

        //
        // GET: /Profile/Details/5

        public ViewResult Details(int id)
        {
            Profile profile = db.Posts.Find(id);
            return View(profile);
        }

        //
        // GET: /Profile/Create

        public ActionResult Create()
        {
            return View();
        } 

        //
        // POST: /Profile/Create

        [HttpPost]
        public ActionResult Create(Profile profile)
        {
            if (ModelState.IsValid)
            {
                db.Posts.Add(profile);
                db.SaveChanges();
                return RedirectToAction("Index");  
            }

            return View(profile);
        }
        
        //
        // GET: /Profile/Edit/5
 
        public ActionResult Edit(int id)
        {
            Profile profile = db.Posts.Find(id);
            return View(profile);
        }

        //
        // POST: /Profile/Edit/5

        [HttpPost]
        public ActionResult Edit(Profile profile)
        {
            if (ModelState.IsValid)
            {
                db.Entry(profile).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(profile);
        }

        //
        // GET: /Profile/Delete/5
 
        public ActionResult Delete(int id)
        {
            Profile profile = db.Posts.Find(id);
            return View(profile);
        }

        //
        // POST: /Profile/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {            
            Profile profile = db.Posts.Find(id);
            db.Posts.Remove(profile);
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