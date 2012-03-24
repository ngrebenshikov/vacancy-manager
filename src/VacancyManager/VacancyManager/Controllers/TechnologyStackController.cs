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
    // GET: /TechnologyStack/Get

    public ActionResult Get()
    {
      return Json(new
      {
        success = true,
        TechStackList = new dynamic[] {
                    new {TechnologyStackID = 1, Name = "Programming"},
                    new {TechnologyStackID = 2, Name = "English level"},
                }
      }, JsonRequestBehavior.AllowGet);
    }

    //
    // GET: /TechListInStack/

    public ActionResult TechListInStack(int id)
    {
      switch (id)
      {
        case 0:
          return Json(new
          {
            success = true,
            TechList = new dynamic[] {
                    new {id = 1, name = "C#"},
                    new {id = 2, name = "Haskell"},
                }
          }, JsonRequestBehavior.AllowGet);
        case 1:
          return Json(new
          {
            success = true,
            TechList = new dynamic[] {
                    new {id = 1, name = "Elementary"},
                    new {id = 2, name = "Middle"},
                    new {id = 3, name = "High Skill"},
                }
          }, JsonRequestBehavior.AllowGet);
        default:
          return Json(new
          {
            success = false,
            TechList = new dynamic[] {}
          }, JsonRequestBehavior.AllowGet);
      }
    }

  }
}
