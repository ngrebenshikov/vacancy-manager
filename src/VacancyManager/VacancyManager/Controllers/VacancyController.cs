using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using VacancyManager.Models;
using VacancyManager.Services;
using VacancyManager.Services.Managers;
using System.Web.Script.Serialization;


namespace VacancyManager.Controllers
{
    [AuthorizeError(Roles = "Admin")]
    public class VacancyController : BaseController
    {

        //
        // GET: /Vacancy/Load

        [HttpGet]
        public JsonResult Load()
        {
            var VisibleVacancies = VacancyDbManager.AllVisibleVacancies();
            var Requirments = RequirementsManager.GetRequirements().ToList();

            var VacanciesList = (from Vacancies in VisibleVacancies
                                 select new
                                 {
                                     VacancyID = Vacancies.VacancyID,
                                     Title = Vacancies.Title,
                                     Description = Vacancies.Description,
                                     OpeningDate = Vacancies.OpeningDate.Value.Date.ToShortDateString(),
                                     Requirements = (from vac in Vacancies.VacancyRequirements
                                                     join req in Requirments on vac.RequirementID equals req.RequirementID
                                                     where vac.IsRequire == true
                                                     select req.Name
                                                    ),
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
        public ActionResult Create(string data)
        {
            bool c_success = false;
            string c_message = "При создания вакансии произошла ошибка";
            List<Vacancy> CreatedVacancy = null;

            JavaScriptSerializer jss = new JavaScriptSerializer();
            if (data != null)
            {
                var c_Vacancy = jss.Deserialize<dynamic>(data);

                String Title = c_Vacancy["Title"].ToString();
                String Description = c_Vacancy["Description"].ToString();
                DateTime OpeningDate = Convert.ToDateTime(c_Vacancy["OpeningDate"]);
                String Requirements = c_Vacancy["Requirements"].ToString();
                Boolean IsVisible = Convert.ToBoolean(c_Vacancy["IsVisible"]);
                CreatedVacancy = (VacancyDbManager.CreateVacancy(Title,
                                                   Description,
                                                   OpeningDate,
                                                   Requirements,
                                                   IsVisible
                 )).ToList();
                c_message = "Вакансия успешно создана";
                c_success = true;
            }

            var newVacancy = (from vac in CreatedVacancy.ToList()
                              select new
                              {
                                  VacancyID = vac.VacancyID,
                                  Title = vac.Title,
                                  Description = vac.Description,
                                  OpeningDate = vac.OpeningDate.Value.Date.ToShortDateString(),
                                  Requirements = "",
                                  IsVisible = vac.IsVisible,
                                  Considerations = 0
                              }).ToList();

            return Json(new
            {
                data = newVacancy,
                success = c_success,
                message = c_message
            }, JsonRequestBehavior.DenyGet);
        }

        [HttpPost]
        public ActionResult Update(string data)
        {
            bool u_success = false;
            string u_message = "При обновлении вакансии произошла ошибка";
            JavaScriptSerializer jss = new JavaScriptSerializer();

            if (data != null)
            {
                var u_vacancy = jss.Deserialize<dynamic>(data);

                object VacancyID = u_vacancy["VacancyID"];
                object Title = u_vacancy["Title"];
                object Description = u_vacancy["Description"];
                object OpeningDate = u_vacancy["OpeningDate"];
                object Requirments = u_vacancy["Requirements"];
                object IsVisible = u_vacancy["IsVisible"];
                VacancyDbManager.UpdateVacancy(Convert.ToInt32(VacancyID),
                                          Title.ToString(),
                                          Description.ToString(),
                                          Convert.ToDateTime(OpeningDate),
                                          Requirments.ToString(),
                                          Convert.ToBoolean(IsVisible)
                 );

                u_message = "Вакансия успешно обновлена";
                u_success = true;
            }
            return Json(new
            {
                success = u_success,
                message = u_message
            }, JsonRequestBehavior.DenyGet);
        }

        [HttpPost]
        public ActionResult Delete(string data)
        {
            bool d_success = false;
            string d_message = "Во время удаления вакансии произошла ошибка";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            if (data != null)
            {
                var d_vacancy = jss.Deserialize<dynamic>(data);

                VacancyDbManager.DeleteVacancy(Convert.ToInt32(d_vacancy["VacancyID"]));
                d_message = "Вакансия успешно удалена";
                d_success = true;
            }
            return Json(new
            {
                success = d_success,
                message = d_message
            });
        }
    }
}
