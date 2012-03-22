using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Models;
using System.Collections.ObjectModel;
using VacancyManager.Services;
using System.Web.Script.Serialization;


namespace VacancyManager.Controllers
{
    public class VakancyController : Controller
    {
        public VacancyContext db = new VacancyContext(); //

        private readonly IRepository _repository;
        // GET: /Vakancy/

        public VakancyController(IRepository repository)
        {
            _repository = repository;
        }

        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /Vakancy/Load

        public JsonResult Load()
        {

            var Vakancies = (from Vacancies in db.Vacancies
                             where Vacancies.IsVisible
                             select new
                             {
                                 v_ID = Vacancies.VacancyID,
                                 Title = Vacancies.Title,
                                 Description = Vacancies.Description,
                                 OpeningDate = Vacancies.OpeningDate,
                                 ForeignLanguage = Vacancies.ForeignLanguage,
                                 Requirments = Vacancies.Requirments,
                                 IsVisible = Vacancies.IsVisible
                             }).ToList();
            return Json(new
                           {
                               data = Vakancies,
                               total = Vakancies.Count
                           },
                        JsonRequestBehavior.AllowGet);
        }

        //
        // GET: /Vakancy/Create

        [HttpPost]
        public ActionResult Create(string data)
        {
            bool c_success = false;
            string c_message = "При создания вакансии произошла ошибка";

            JavaScriptSerializer jss = new JavaScriptSerializer();
            if (data != null)
            {
                var d_Vakancy = jss.Deserialize<dynamic>(data);

                object Title = d_Vakancy["Title"];
                object Description = d_Vakancy["Description"];
                object OpeningDate = d_Vakancy["OpeningDate"];
                object ForeignLanguage = d_Vakancy["ForeignLanguage"];
                object Requirments = d_Vakancy["Requirments"];
                object IsVisible = d_Vakancy["IsVisible"];

                _repository.CreateVacancy(Title.ToString(),
                                          Description.ToString(),
                                          Convert.ToDateTime(OpeningDate),
                                          ForeignLanguage.ToString(),
                                          Requirments.ToString(),
                                          Convert.ToBoolean(IsVisible)
                 );
                c_message = "Вакансия успешно создана";
                c_success = true;
            }

            return Json(new
            {
                success = c_success,
                message = c_message
            });
        }

        [HttpPost]
        public ActionResult Update(string data)
        {
            bool u_success = false;
            string u_message = "При обновлении вакансии произошла ошибка";
            System.Web.Script.Serialization.JavaScriptSerializer jss = new System.Web.Script.Serialization.JavaScriptSerializer();

            if (data != null)
            {
                var u_vakancy = jss.Deserialize<dynamic>(data);

                object VakancyID = u_vakancy["v_ID"];
                object Title = u_vakancy["Title"];
                object Description = u_vakancy["Description"];
                object OpeningDate = u_vakancy["OpeningDate"];
                object ForeignLanguage = u_vakancy["ForeignLanguage"];
                object Requirments = u_vakancy["Requirments"];
                object IsVisible = u_vakancy["IsVisible"];

                _repository.UpdateVakancy(Convert.ToInt32(VakancyID),
                                          Title.ToString(),
                                          Description.ToString(),
                                          Convert.ToDateTime(OpeningDate),
                                          ForeignLanguage.ToString(),
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
            });
        }

        [HttpPost]
        public ActionResult Delete(string data)
        {
            bool d_success = false;
            string d_message = "Во время обновления вакансии произошла ошибка";
            System.Web.Script.Serialization.JavaScriptSerializer jss = new System.Web.Script.Serialization.JavaScriptSerializer();
            if (data != null)
            {
                var d_vakancy = jss.Deserialize<dynamic>(data);

                _repository.DeleteVakancy(Convert.ToInt32(d_vakancy["v_ID"]));
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
