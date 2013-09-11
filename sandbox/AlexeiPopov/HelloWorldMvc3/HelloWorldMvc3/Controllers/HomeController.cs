using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HelloWorldMvc3.Models;

namespace HelloWorldMvc3.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            using (var db = new HelloWorldContext())
            {
                var dbTable = from phr in db.HelloWorldPhrases 
                              where phr.Phrase1=="Hello" 
                              select phr;
                var list = dbTable.ToList();
                if (list.Count == 0)
                {
                    db.HelloWorldPhrases.Add(new HelloWorldPhrase { Phrase1 = "Hello", Phrase2 = "World" });
                    db.SaveChanges();
                }
            }

            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }

        public ActionResult About()
        {
            return View();
        }
    }
}
