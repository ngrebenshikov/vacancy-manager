using System;
using System.Linq;
using System.Web.Mvc;
using VacancyManager.Services.Managers;
using VacancyManager.Services;
using System.Web.Script.Serialization;

namespace VacancyManager.Controllers
{
  [AuthorizeError(Roles = "Admin")]
  public class RequirementStackController : Controller
  {

    //
    // GET: /RequirementStack/Get
    [HttpGet]
    public ActionResult GetStack()
    {
      var requestResult = RequirementsManager.GetAllRequirementStacks();
      var stackList = (from elem in requestResult
                       select new
                         {
                           elem.RequirementStackID,
                           elem.Name,
                         }
                      ).ToList();
      return Json(new
      {
        success = true,
        RequirementStackList = stackList,
      }, JsonRequestBehavior.AllowGet);
    }

    [HttpPost]
    public ActionResult AddStack(string data)
    {
      bool success = false;
      string resultMess = "Ошибка при добавлении стека требований";
      JavaScriptSerializer jss = new JavaScriptSerializer();
      dynamic[] requirementStackList = new dynamic[1];
      if (data != null)
      {
        var requirementStack = jss.Deserialize<dynamic>(data);

        int id = RequirementsManager.CreateRequirementStack(requirementStack["Name"].ToString());
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
          success = true,
          RequirementStackList = requirementStackList,
          message = resultMess
        });
      }
      return Json(new
                    {
                      success = false,
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

        RequirementsManager.DeleteRequirementStack(Convert.ToInt32(record["RequirementStackID"]));
        message = "Стек удалён";
        success = true;
      }
      return Json(new
      {
        success,
        message
      });
    }

    [HttpPost]
    public ActionResult UpdateStack(string data)
    {
      bool success = false;
      string message = "При обновлении записи о стеке требований произошла ошибка";
      JavaScriptSerializer jss = new JavaScriptSerializer();

      if (data != null)
      {
        var record = jss.Deserialize<dynamic>(data);

        RequirementsManager.UpdateRequirementStack(Convert.ToInt32(record["RequirementStackID"]), record["Name"].ToString());

        message = "Запись о стеке требований успешно обновлена";
        success = true;
      }
      return Json(new
      {
        success,
        message
      });
    }

    //
    // GET: /GetRequirementListInStack/
    [HttpGet]
    public ActionResult GetRequirementListInStack(int id)
    {
      try
      {
        var requestResult = RequirementsManager.GetAllRequirements(id);
        var requirementList = (from elem in requestResult
                               select new
                               {
                                 elem.RequirementID,
                                 elem.RequirementStackID,
                                 elem.Name,
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
    public ActionResult AddRequirementToStack(string data)
    {
      bool success = false;
      string resultMess = "Ошибка при добавлении требования в стек";
      JavaScriptSerializer jss = new JavaScriptSerializer();
      dynamic[] requirement = new dynamic[1];
      if (data != null)
      {
        var record = jss.Deserialize<dynamic>(data);

        int id = RequirementsManager.CreateRequirement(Convert.ToInt32(record["RequirementStackID"]), record["Name"].ToString());
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
          success = true,
          RequirementList = requirement,
          message = resultMess
        });
      }
      return Json(new
                    {
                      success = false,
                      message = resultMess
                    });
    }

    [HttpPost]
    public ActionResult DeleteRequirementFromStack(string data)
    {
      bool success = false;
      string message = "Ошибка во время удаления требования";
      JavaScriptSerializer jss = new JavaScriptSerializer();
      if (data != null)
      {
        var record = jss.Deserialize<dynamic>(data);

        RequirementsManager.DeleteRequirement(Convert.ToInt32(record["RequirementID"]));
        message = "Требование удалено";
        success = true;
      }
      return Json(new
      {
        success,
        message
      });
    }

    [HttpPost]
    public ActionResult UpdateRequirementInStack(string data)
    {
      bool success = false;
      string message = "При обновлении записи о требовании произошла ошибка";
      JavaScriptSerializer jss = new JavaScriptSerializer();

      if (data != null)
      {
        var record = jss.Deserialize<dynamic>(data);

        RequirementsManager.UpdateRequirement(Convert.ToInt32(record["RequirementID"]), record["Name"].ToString());

        message = "Запись о требовании успешно обновлена";
        success = true;
      }
      return Json(new
      {
        success,
        message
      });
    }
  }
}
