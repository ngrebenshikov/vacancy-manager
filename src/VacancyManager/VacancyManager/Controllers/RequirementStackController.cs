using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Services;
using System.Web.Script.Serialization;

namespace VacancyManager.Controllers
{
  public class RequirementStackController : Controller
  {
    private readonly IRepository _repository;

    public RequirementStackController(IRepository repository)
    {
      _repository = repository;
    }

    //
    // GET: /RequirementStack/Get
    [HttpGet]
    [AuthorizeError]
    public ActionResult GetStack()
    {
      var requestResult = _repository.GetAllRequirementStacks();
      var stackList = (from elem in requestResult
                       select new
                         {
                           RequirementStackID = elem.RequirementStackID,
                           Name = elem.Name,
                         }
                      ).ToList();
      return Json(new
      {
        success = true,
        RequirementStackList = stackList,
      }, JsonRequestBehavior.AllowGet);
    }

    [HttpPost]
    [AuthorizeError]
    public ActionResult AddStack(string data)
    {
      bool success = false;
      string resultMess = "Ошибка при добавлении стека требований";
      JavaScriptSerializer jss = new JavaScriptSerializer();
      dynamic[] requirementStackList = new dynamic[1];
      if (data != null)
      {
        var requirementStack = jss.Deserialize<dynamic>(data);

        int id = _repository.CreateRequirementStack(requirementStack["Name"].ToString());
        requirementStackList[0] =
          new
          {
            RequirementStackID = id,
            Name = requirementStack["Name"].ToString()
          };
        resultMess = "Стек требований успешно добавлен";
        success = true;
      }
      if (success)
      {
        return Json(new
        {
          success = success,
          RequirementStackList = requirementStackList,
          message = resultMess
        });
      }
      else
        return Json(new
        {
          success = success,
          message = resultMess
        });
    }

    [HttpPost]
    [AuthorizeError]
    public ActionResult DeleteStack(string data)
    {
      bool success = false;
      string message = "Ошибка во время удаления стека";
      JavaScriptSerializer jss = new JavaScriptSerializer();
      if (data != null)
      {
        var record = jss.Deserialize<dynamic>(data);

        _repository.DeleteRequirementStack(Convert.ToInt32(record["RequirementStackID"]));
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
    [AuthorizeError]
    public ActionResult UpdateStack(string data)
    {
      bool success = false;
      string message = "При обновлении записи о стеке требований произошла ошибка";
      JavaScriptSerializer jss = new JavaScriptSerializer();

      if (data != null)
      {
        var record = jss.Deserialize<dynamic>(data);

        _repository.UpdateRequirementStack(Convert.ToInt32(record["RequirementStackID"]), record["Name"].ToString());

        message = "Запись о стеке требований успешно обновлена";
        success = true;
      }
      return Json(new
      {
        success = success,
        message = message
      });
    }

    //
    // GET: /GetRequirementListInStack/
    [HttpGet]
    [AuthorizeError]
    public ActionResult GetRequirementListInStack(int id)
    {
      try
      {
        var requestResult = _repository.GetAllRequirements(id);
        var requirementList = (from elem in requestResult
                               select new
                               {
                                 RequirementID = elem.RequirementID,
                                 RequirementStackID = elem.RequirementStackID,
                                 Name = elem.Name,
                               }
                          ).ToList();
        return Json(new
        {
          success = true,
          RequirementList = requirementList,
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
    [AuthorizeError]
    public ActionResult AddRequirementToStack(string data)
    {
      bool success = false;
      string resultMess = "Ошибка при добавлении требования в стек";
      JavaScriptSerializer jss = new JavaScriptSerializer();
      dynamic[] requirement = new dynamic[1];
      if (data != null)
      {
        var record = jss.Deserialize<dynamic>(data);

        int id = _repository.CreateRequirement(Convert.ToInt32(record["RequirementStackID"]), record["Name"].ToString());
        requirement[0] =
          new
          {
            RequirementID = id,
            Name = record["Name"].ToString(),
            RequirementStackID = Convert.ToInt32(record["RequirementStackID"])
          };
        resultMess = "Требование успешно добавлено в стек";
        success = true;
      }
      if (success)
      {
        return Json(new
        {
          success = success,
          RequirementList = requirement,
          message = resultMess
        });
      }
      else
      {
        return Json(new
        {
          success = success,
          message = resultMess
        });
      }
    }

    [HttpPost]
    [AuthorizeError]
    public ActionResult DeleteRequirementFromStack(string data)
    {
      bool success = false;
      string message = "Ошибка во время удаления требования";
      JavaScriptSerializer jss = new JavaScriptSerializer();
      if (data != null)
      {
        var record = jss.Deserialize<dynamic>(data);

        _repository.DeleteRequirement(Convert.ToInt32(record["RequirementID"]));
        message = "Требование удалено";
        success = true;
      }
      return Json(new
      {
        success = success,
        message = message
      });
    }

    [HttpPost]
    [AuthorizeError]
    public ActionResult UpdateRequirementInStack(string data)
    {
      bool success = false;
      string message = "При обновлении записи о требовании произошла ошибка";
      JavaScriptSerializer jss = new JavaScriptSerializer();

      if (data != null)
      {
        var record = jss.Deserialize<dynamic>(data);

        _repository.UpdateRequirement(Convert.ToInt32(record["RequirementID"]), record["Name"].ToString());

        message = "Запись о требовании успешно обновлена";
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
