using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Services;
using System.Web.Script.Serialization;

namespace VacancyManager.Controllers
{
  public class TechnologyStackController : Controller
  {
    private readonly IRepository _repository;

    public TechnologyStackController(IRepository repository)
    {
      _repository = repository;
    }

    //
    // GET: /TechnologyStack/Get
    public ActionResult GetStack()
    {
      var requestResult = _repository.GetAllTechStacks();
      var stackList = (from elem in requestResult
                       select new
                         {
                           TechnologyStackID = elem.TechnologyStackID,
                           Name = elem.Name,
                         }
                      ).ToList();
      return Json(new
      {
        success = true,
        TechStackList = stackList,
      }, JsonRequestBehavior.AllowGet);
    }

    [HttpPost]
    public ActionResult AddStack(string data)
    {
      bool success = false;
      string resultMess = "Ошибка при добавлении стека технологии";
      JavaScriptSerializer jss = new JavaScriptSerializer();
      if (data != null)
      {
        var techStack = jss.Deserialize<dynamic>(data);

        _repository.CreateTechStack(techStack["Name"].ToString());
        resultMess = "Стек технологий успешно добавлен";
        success = true;
      }

      return Json(new
      {
        success = success,
        message = resultMess
      });
    }

    [HttpPost]
    public ActionResult DeleteStack(string data)
    {
      bool success = false;
      string message = "Ошибка во время удаления стека";
      JavaScriptSerializer jss = new JavaScriptSerializer();
      if (data != null)
      {
        var record = jss.Deserialize<dynamic>(data);

        _repository.DeleteTechStack(Convert.ToInt32(record["TechnologyStackID"]));
        message = "Стек удалён";
        success = true;
      }
      return Json(new
      {
        success = success,
        message = message
      });
    }

    [HttpPost]
    public ActionResult UpdateStack(string data)
    {
      bool success = false;
      string message = "При обновлении записи о стеке технологий произошла ошибка";
      JavaScriptSerializer jss = new JavaScriptSerializer();

      if (data != null)
      {
        var record = jss.Deserialize<dynamic>(data);

        _repository.UpdateTechStack(Convert.ToInt32(record["TechnologyStackID"]), record["Name"].ToString());

        message = "Запись о стеке технологий успешно обновлена";
        success = true;
      }
      return Json(new
      {
        success = success,
        message = message
      });
    }

    //
    // GET: /GetTechListInStack/

    public ActionResult GetTechListInStack(int id)
    {
      try
      {
        var requestResult = _repository.GetAllTechnologies(id);
        var techList = (from elem in requestResult
                        select new
                        {
                          TechnologyID = elem.TechnologyID,
                          TechnologyStackID = elem.TechnologyStackID,
                          Name = elem.Name,
                        }
                          ).ToList();
        return Json(new
        {
          success = true,
          TechList = techList,
        }, JsonRequestBehavior.AllowGet);
      }
      catch
      {
        return Json(new
        {
          success = true,
          TechList = new dynamic[] { },
        }, JsonRequestBehavior.AllowGet);
      }
    }

    [HttpPost]
    public ActionResult AddTechToStack(string data)
    {
      bool success = false;
      string resultMess = "Ошибка при добавлении технологии в стек";
      JavaScriptSerializer jss = new JavaScriptSerializer();
      if (data != null)
      {
        var tech = jss.Deserialize<dynamic>(data);

        _repository.CreateTechnology(Convert.ToInt32(tech["TechnologyStackID"]), tech["Name"].ToString());
        resultMess = "Технология успешно добавлена в стек";
        success = true;
      }

      return Json(new
      {
        success = success,
        message = resultMess
      });
    }

    [HttpPost]
    public ActionResult DeleteTechFromStack(string data)
    {
      bool success = false;
      string message = "Ошибка во время удаления технологии";
      JavaScriptSerializer jss = new JavaScriptSerializer();
      if (data != null)
      {
        var record = jss.Deserialize<dynamic>(data);

        _repository.DeleteTechnology(Convert.ToInt32(record["TechnologyID"]));
        message = "Технология удалена";
        success = true;
      }
      return Json(new
      {
        success = success,
        message = message
      });
    }

    [HttpPost]
    public ActionResult UpdateTechInStack(string data)
    {
      bool success = false;
      string message = "При обновлении записи о технологии произошла ошибка";
      JavaScriptSerializer jss = new JavaScriptSerializer();

      if (data != null)
      {
        var record = jss.Deserialize<dynamic>(data);

        _repository.UpdateTechnology(Convert.ToInt32(record["TechnologyID"]), record["Name"].ToString());

        message = "Запись о технологии успешно обновлена";
        success = true;
      }
      return Json(new
      {
        success = success,
        message = message
      });
    }
  }
}
