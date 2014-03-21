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
            var Requirments = RequirementsManager.GetRequirements().ToList();
            var BaseAdress = "http://" + Request.Url.Authority + "/FrontEnd/Index?id=";
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
                                     Link = BaseAdress + Vacancies.SpecialKey,
                                     IsVisible = Vacancies.IsVisible,
                                     VacancyRequirements = Vacancies.VacancyRequirements,
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
            Vacancy CreatedVacancy = null;
            var BaseAdress = "http://" + Request.Url.Authority + "/FrontEnd/Index?id=";

            JavaScriptSerializer jss = new JavaScriptSerializer();
            if (data != null)
            {
                var c_Vacancy = jss.Deserialize<dynamic>(data);

                String Title = c_Vacancy["Title"].ToString();
                String Description = c_Vacancy["Description"].ToString();
                DateTime OpeningDate = Convert.ToDateTime(c_Vacancy["OpeningDate"]);
                String Requirements = c_Vacancy["Requirements"].ToString();
                Boolean IsVisible = Convert.ToBoolean(c_Vacancy["IsVisible"]);
                CreatedVacancy = VacancyDbManager.CreateVacancy(Title,
                                                   Description,
                                                   OpeningDate,
                                                   Requirements,
                                                   IsVisible
                 );
                c_message = "Вакансия успешно создана";
                c_success = true;
            }

            var newVacancy = new
                              {
                                  VacancyID = CreatedVacancy.VacancyID,
                                  Title = CreatedVacancy.Title,
                                  Description = CreatedVacancy.Description,
                                  OpeningDate = CreatedVacancy.OpeningDate.Value.Date.ToShortDateString(),
                                  Requirements = "",
                                  Link = BaseAdress + CreatedVacancy.SpecialKey,
                                  IsVisible = CreatedVacancy.IsVisible,
                                  Considerations = 0
                              };

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
            var Requirments = RequirementsManager.GetRequirements().ToList();
            bool u_success = false;
            string u_message = "При обновлении вакансии произошла ошибка";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            var BaseAdress = "http://" + Request.Url.Authority + "/FrontEnd/Index?id=";
            object newVacancy = null;

            if (data != null)
            {
                var u_vacancy = jss.Deserialize<dynamic>(data);

                object VacancyID = u_vacancy["VacancyID"];
                object Title = u_vacancy["Title"];
                object Description = u_vacancy["Description"];
                object OpeningDate = u_vacancy["OpeningDate"];
                object IsVisible = u_vacancy["IsVisible"];
                Vacancy UpdatedVacancy = VacancyDbManager.UpdateVacancy(Convert.ToInt32(VacancyID),
                                          Title.ToString(),
                                          Description.ToString(),
                                          Convert.ToDateTime(OpeningDate),
                                          Convert.ToBoolean(IsVisible)
                 );

                newVacancy = new
                {
                    VacancyID = UpdatedVacancy.VacancyID,
                    Title = UpdatedVacancy.Title,
                    Description = UpdatedVacancy.Description,
                    OpeningDate = UpdatedVacancy.OpeningDate.Value.Date.ToShortDateString(),
                    Requirements = (from vac in UpdatedVacancy.VacancyRequirements
                                    join req in Requirments on vac.RequirementID equals req.RequirementID
                                    where vac.IsRequire == true
                                    select req.Name
                                   ),
                    Link = BaseAdress + UpdatedVacancy.SpecialKey,
                    IsVisible = UpdatedVacancy.IsVisible,
                    Considerations = UpdatedVacancy.Considerations.Count()
                };

                u_message = "Вакансия успешно обновлена";
                u_success = true;
            }



            return Json(new
            {
                success = u_success,
                data = newVacancy,
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
