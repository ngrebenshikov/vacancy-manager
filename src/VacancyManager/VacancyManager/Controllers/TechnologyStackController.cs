using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VacancyManager.Controllers
{
  public class TechnologyStackController : Controller
  {
    //
    // GET: /TechnologyStack/

    public ActionResult Index()
    {
      return Json(new
      {
        success = true,
        TechStackList = new dynamic[] {
                    new {id = 1, name = "Programming"},
                    new {id = 2, name = "English level"},
                }
      }, JsonRequestBehavior.AllowGet);
    }

    //
    // GET: /TechListInStack/

    public ActionResult TechListInStack()
    {
      return Json(new
      {
        success = true,
        TechList = new dynamic[] {
                    new {id = 1, name = "C#"},
                    new {id = 2, name = "Haskell"},
                }
      }, JsonRequestBehavior.AllowGet);
    }

  }
}
