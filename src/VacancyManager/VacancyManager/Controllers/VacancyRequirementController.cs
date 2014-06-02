using System;
using System.Linq;
using System.Web.Mvc;
using VacancyManager.Models;
using VacancyManager.Services;
using VacancyManager.Models.JSON;
using VacancyManager.Services.Managers;
using System.Collections.Generic;

namespace VacancyManager.Controllers
{

    public class VacancyRequirementController : AdminController
    {
        // GET: /VacancyRequirement/
        [HttpGet]
        public JsonResult Load(int id)
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
                              VacancyRequirementID = (b.VacancyRequirementID > -1 ? Convert.ToString(b.VacancyRequirementID) : ""),
                              StackName = o.Name,
                              VacancyID = id,
                              RequirementStackID = v.RequirementStackID,
                              RequirementID = v.RequirementID,
                              RequirementName = v.Name,
                              Comments = b.Comments,
                              IsRequire = b.IsRequire
                          };

            return Json(new
            {
                data = Complex.ToList(),
                total = Complex.ToList().Count,
                success = true
            }, JsonRequestBehavior.AllowGet
            );
        }

        [HttpPost]
        public ActionResult Create(List<JsonVacancyRequirement> vacancyRequirements)
        {
            bool CreateSuccess = false;
            string CreateMessage = "При изменении требований произошла ошибка";
            if (vacancyRequirements != null)
            {
                foreach (JsonVacancyRequirement VacReq in vacancyRequirements)
                {
                    Tuple<string, bool> Status = VacReq.UpdateInVacancyRequirementsStore();
                    CreateSuccess = Status.Item2;
                    CreateMessage = Status.Item1;
                } 
            }
            return Json(new { success = CreateSuccess,  message = CreateMessage });
        }

        [HttpPost]
        public ActionResult Update(List<JsonVacancyRequirement> vacancyRequirements)
        {
            bool UpdateSuccess = false;
            string UpdateMessage = "При изменении требований произошла ошибка";
            if (vacancyRequirements != null)
             {
                 foreach (JsonVacancyRequirement VacReq in vacancyRequirements)
                 {
                    Tuple<string, bool> Status = VacReq.UpdateInVacancyRequirementsStore();
                    UpdateSuccess = Status.Item2;
                    UpdateMessage = Status.Item1;
                 }
           
             } 
            return Json(new  { success = UpdateSuccess,  message = UpdateMessage });
        }
    }

}

