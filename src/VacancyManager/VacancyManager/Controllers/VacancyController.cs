using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using VacancyManager.Models;
using VacancyManager.Models.JSON;
using VacancyManager.Services;
using VacancyManager.Services.Managers;
using System.Web.Script.Serialization;

namespace VacancyManager.Controllers
{
    public class VacancyController : AdminController
    {

        public JsonResult GetVacancyAssign(int appId)
        {
            var Considerations = ConsiderationsManager.GetApplicantConsiderations(appId);
            var Vacancies = VacancyDbManager.AllVisibleVacancies();

            var vacIds = (from cons in Considerations
                          select cons.VacancyID).ToArray();

            var VacanciesList = (from vacs in Vacancies
                                 where !vacIds.Contains(vacs.VacancyID)
                                 select new
                                 {
                                     VacancyID = vacs.VacancyID,
                                     OpeningDate = vacs.OpeningDate.Value.Date.ToShortDateString(),
                                     Vacancy = vacs.Title
                                 }).ToList();
            return Json(new
            {
                vacancyAssign = VacanciesList,
                total = VacanciesList.Count,
                success = true
            },
       JsonRequestBehavior.AllowGet);

        }
        // GET: /Vacancy/Load/id
        [HttpGet]
        public JsonResult LoadSingle(int id)
        {
            var mVacancy = VacancyDbManager.GetVacancyByID(id);
            var Requirments = RequirementsManager.GetRequirements().ToList();
            var BaseAdress = "http://" + Request.Url.Authority + "/FrontEnd/Index?id=";

            var newVacancy = new
            {
                VacancyID = mVacancy.VacancyID,
                Title = mVacancy.Title,
                Description = mVacancy.Description,
                OpeningDate = mVacancy.OpeningDate.Value.Date.ToShortDateString(),
                Requirements = (from vac in mVacancy.VacancyRequirements
                                join req in Requirments on vac.RequirementID equals req.RequirementID
                                where vac.IsRequire == true
                                select req.Name
                                                    ),
                Link = BaseAdress + mVacancy.SpecialKey,
                IsVisible = mVacancy.IsVisible,
                Considerations = 0
            };

            return Json(new
            {
                data = newVacancy,
                total = 1,
                success = true
            },
            JsonRequestBehavior.AllowGet);
        }
        // GET: /Vacancy/Load

        [HttpGet]
        public JsonResult Load()
        {
            var VisibleVacancies = VacancyDbManager.AllVisibleVacancies();
            var BaseAdress = "http://" + Request.Url.Authority + "/FrontEnd/Index?id=";
            var VacanciesList = (from Vacancies in VisibleVacancies
                                 select new
                                 {
                                     VacancyID = Vacancies.VacancyID,
                                     Title = Vacancies.Title,
                                     Description = Vacancies.Description,
                                     OpeningDate = Vacancies.OpeningDate.Value.Date.ToShortDateString(),
                                     Requirements = (from req in Vacancies.VacancyRequirements
                                                     where req.IsRequire == true
                                                     select req.Requirement.Name
                                                    ),
                                     Link = BaseAdress + Vacancies.SpecialKey,
                                     IsVisible = Vacancies.IsVisible,
                                     Considerations = Vacancies.Considerations.Count
                                 }
                             ).ToList();

            return Json(new
            {
                data = VacanciesList,
                total = VacanciesList.Count,
                success = true
            },
            JsonRequestBehavior.AllowGet);
        }

        //
        // GET: /Vacancy/Create

        [HttpPost]
        public ActionResult Create(JsonVacancy vacancy)
        {
            bool c_success = false;
            string c_message = "При создания вакансии произошла ошибка";
            if (vacancy != null)
            {
                Tuple<string, bool> CreationStatus = vacancy.AddToVacanciesStore();
                c_message = CreationStatus.Item1;
                c_success = CreationStatus.Item2;
            }
            return Json(new { data = vacancy, success = c_success, message = c_message }, JsonRequestBehavior.DenyGet);
        }

        [HttpPost]
        public ActionResult Update(JsonVacancy vacancy)
        {
            bool u_success = false;
            string u_message = "При обновлении вакансии произошла ошибка";
            var BaseAdress = "http://" + Request.Url.Authority + "/FrontEnd/Index?id=";

            if (vacancy != null)
            {
                Tuple<string, bool> UpdateStatus = vacancy.UpdateInVacanciesStore(BaseAdress);
                u_message = UpdateStatus.Item1;
                u_success = UpdateStatus.Item2;
            }

            return Json(new { success = u_success, data = vacancy, message = u_message }, JsonRequestBehavior.DenyGet);
        }

        [HttpPost]
        public ActionResult Delete(JsonVacancy vacancy)
        {
            bool d_success = false;
            string d_message = "Во время удаления вакансии произошла ошибка";
            if (vacancy != null)
            {
                Tuple<string, bool> DeleteStatus = vacancy.DeleteFromVacanciesStore();
                d_message = DeleteStatus.Item1;
                d_success = DeleteStatus.Item2;
            }
            return Json(new { success = d_success,  message = d_message });
        }

    }

}
