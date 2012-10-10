using System;
using System.Linq;
using System.Web.Mvc;
using VacancyManager.Models;
using VacancyManager.Services;
using System.Web.Script.Serialization;
using VacancyManager.Services.Managers;

namespace VacancyManager.Controllers
{
  [AuthorizeError(Roles = "Admin")]
  public class VacancyRequirementController : Controller
  {

    //
    // GET: /VacancyRequirement/
    /*public ActionResult Index()
    {
      return View();
    }*/

    [HttpGet]
    public JsonResult LoadVacancyRequirements(int id)
    {
      var RequirementsStackList = RequirementsManager.GetAllRequirementStacks().ToList();
      var RequirementsList = RequirementsManager.GetRequirements().ToList();
      var VacancyRequirementsList = VacancyRequirementsManager.GetVacancyRequirements(id).ToList();

      var Complex = from o in RequirementsStackList
                    join v in RequirementsList on o.RequirementStackID equals v.RequirementStackID
                    join y in VacancyRequirementsList on v.RequirementID equals y.RequirementID into a
                    from b in a.DefaultIfEmpty(new VacancyRequirement())
                    select new
                    {
                      VacancyRequirementID = b.VacancyRequirementID,
                      StackName = o.Name,
                      VacancyID = b.VacancyID,
                      RequirementStackID = v.RequirementStackID,
                      RequirementID = v.RequirementID,
                      RequirementName = v.Name,
                      Comments = b.Comments,
                      Require = (b.VacancyRequirementID > 0 ? "true" :
                                 b.VacancyRequirementID == -1 ? "false" : "false"
                      )
                    };

      return Json(new
      {
        VacancyRequirements = Complex.ToList(),
        total = Complex.ToList().Count
      },
                  JsonRequestBehavior.AllowGet
      );
    }

    [HttpPost]
    public ActionResult UpdateVacancyRequirements(string[] data)
    {
      bool u_success = false;
      string u_message = "При изменении требований произошла ошибка";
      JavaScriptSerializer jss = new JavaScriptSerializer();
      if (data != null)
      {
        for (int i = 0; i <= data.Length - 1; i++)
        {
          var u_vacancyrequirement = jss.Deserialize<dynamic>(data[i]);
          Int32 VacancyRequirementID = Convert.ToInt32(u_vacancyrequirement["VacancyRequirementID"]);
          Int32 VacancyID = Convert.ToInt32(u_vacancyrequirement["VacancyID"]);
          Int32 RequirementID = Convert.ToInt32(u_vacancyrequirement["RequirementID"]);
          String Comments = u_vacancyrequirement["Comments"].ToString();
          Boolean Require = Convert.ToBoolean(u_vacancyrequirement["Require"]);
          if ((VacancyRequirementID == -1) && (Require == true))
          {
            VacancyRequirementsManager.CreateVacancyRequirement(VacancyID,
                                                 RequirementID,
                                                 Comments);
          }
          else
            if ((VacancyRequirementID > -1) && (Require == true))
            {
              VacancyRequirementsManager.UpdateVacancyRequirement(VacancyID,
                                                   RequirementID,
                                                   Comments);
            }
            else
              if ((VacancyRequirementID > -1) && (Require == false))
              {
                VacancyRequirementsManager.DeleteVacancyRequirement(VacancyRequirementID);
              }
        }
        u_success = true;
        u_message = "Требования успешно изменены";
      }
      return Json(new
      {
        success = u_success,
        message = u_message
      });
    }


  }
}
