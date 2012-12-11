using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HelloWorldMvc3.Models;

namespace HelloWorldMvc3.Controllers
{ 
    public class HelloWorldFromDbController : Controller
    {
        //
        // Все сгенерировано студией
        //

        private HelloWorldContext db = new HelloWorldContext();

        //
        // GET: /HelloWorldFromDb/

        public ViewResult Index()
        {
            return View(db.HelloWorldPhrases.ToList());
        }

        //
        // GET: /HelloWorldFromDb/Details/5

        public ViewResult Details(Guid id)
        {
            HelloWorldPhrase helloworldphrase = db.HelloWorldPhrases.Find(id);
            return View(helloworldphrase);
        }

        //
        // GET: /HelloWorldFromDb/Create

        public ActionResult Create()
        {
            return View();
        } 

        //
        // POST: /HelloWorldFromDb/Create

        [HttpPost]
        public ActionResult Create(HelloWorldPhrase helloworldphrase)
        {
            if (ModelState.IsValid)
            {
                helloworldphrase.Id = Guid.NewGuid();
                db.HelloWorldPhrases.Add(helloworldphrase);
                db.SaveChanges();
                return RedirectToAction("Index");  
            }

            return View(helloworldphrase);
        }
        
        //
        // GET: /HelloWorldFromDb/Edit/5
 
        public ActionResult Edit(Guid id)
        {
            HelloWorldPhrase helloworldphrase = db.HelloWorldPhrases.Find(id);
            return View(helloworldphrase);
        }

        //
        // POST: /HelloWorldFromDb/Edit/5

        [HttpPost]
        public ActionResult Edit(HelloWorldPhrase helloworldphrase)
        {
            if (ModelState.IsValid)
            {
                db.Entry(helloworldphrase).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(helloworldphrase);
        }

        //
        // GET: /HelloWorldFromDb/Delete/5
 
        public ActionResult Delete(Guid id)
        {
            HelloWorldPhrase helloworldphrase = db.HelloWorldPhrases.Find(id);
            return View(helloworldphrase);
        }

        //
        // POST: /HelloWorldFromDb/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(Guid id)
        {            
            HelloWorldPhrase helloworldphrase = db.HelloWorldPhrases.Find(id);
            db.HelloWorldPhrases.Remove(helloworldphrase);
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