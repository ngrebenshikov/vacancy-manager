using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcPlusExtJs.Controllers
{
    public class UsersController : Controller
    {
        //
        // GET: /Users/

        public ActionResult Index()
        {
            return Json(new
            {
                success = true,
                users = new dynamic[] {
                    new {id = 1, name = "Ed", email = "ed@sencha.com"},
                    new {id = 2, name = "Tommy", email = "tommy@sencha.com"}
                }
            },
            JsonRequestBehavior.AllowGet);
        }

    }
}
