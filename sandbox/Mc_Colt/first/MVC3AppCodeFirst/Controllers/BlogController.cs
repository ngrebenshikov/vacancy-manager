using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC3AppCodeFirst.Models;
using System.Data.Entity;

namespace MVC3AppCodeFirst.Controllers 
{
    public class BlogController : Controller
    {
        //
        // GET: /Blog/

        public ActionResult Index()
        {
            using (var db = new BlogContext())
            {
                return View(db.Blogs.ToList());
            }
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(Blog newBlog)
        {
            try
            {
                using (var db = new BlogContext())
                {
                    db.Blogs.Add(newBlog);
                    db.SaveChanges();
                }
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        public ActionResult Edit(int id)
        {
            using (var db = new BlogContext())
            {
                return View(db.Blogs.Find(id));
            }
        }

        [HttpPost]

        public ActionResult Edit(int id, Blog blog)
        {
            try
            {
                BlogContext context = new BlogContext();
                
                context.Entry(blog).State = System.Data.EntityState.Modified;
                context.SaveChanges();

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        public ActionResult Delete(int id)
        {
            using (var context = new BlogContext())
            {
                return View(context.Blogs.Find(id));
            }
        }
        [HttpPost]
        public ActionResult Delete(int id, Blog blog)
        {
            try
            {
                using (BlogContext context = new BlogContext())
                {
                    context.Entry(blog).State = System.Data.EntityState.Deleted;
                    context.SaveChanges();
                }
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
