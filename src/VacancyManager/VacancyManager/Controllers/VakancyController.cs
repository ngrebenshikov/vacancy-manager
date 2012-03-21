using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Models;
using System.Collections.ObjectModel;
using VacancyManager.Services;



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

            var VakancyList = from Vacancies in db.Vacancies
                              where Vacancies.IsVisible
                              select new { ID = Vacancies.VacancyID,
                                           Title = Vacancies.Title, 
                                           Description = Vacancies.Description, 
                                           OpeningDate = Vacancies.OpeningDate,
                                           ForeignLanguage = Vacancies.ForeignLanguage,
                                           Requirments = Vacancies.Requirments,
                                           IsVisible = Vacancies.IsVisible
                             };

            var Vakancies = VakancyList.ToList();  
            return Json(new 
                           { data = Vakancies,
                             total = Vakancies.Count }, 
                        JsonRequestBehavior.AllowGet);
        }

        //
        // GET: /Vakancy/Create

        [HttpPost]
        public ActionResult Create(string data, Vacancy newVacancy)
        {
            System.Web.Script.Serialization.JavaScriptSerializer jss = new System.Web.Script.Serialization.JavaScriptSerializer();
            var deserializedData = jss.Deserialize<dynamic>(data);

           // object vakancyID = deserializedData["vakancyID"];
            object Title = deserializedData["Title"];
            object Description = deserializedData["Description"];
            object OpeningDate = deserializedData["OpeningDate"];
            object ForeignLanguage = deserializedData["ForeignLanguage"];
            object Requirments = deserializedData["Requirments"];
            object IsVisible = deserializedData["IsVisible"];

            newVacancy.VacancyID = -1;
            newVacancy.Title = Title.ToString();
            newVacancy.Description = Description.ToString();
            newVacancy.OpeningDate = Convert.ToDateTime(OpeningDate.ToString());
            newVacancy.ForeignLanguage = ForeignLanguage.ToString();
            newVacancy.Requirments = Requirments.ToString();
            newVacancy.IsVisible = true;

            newVacancy = new Vacancy
                                {   VacancyID =  newVacancy.VacancyID, 
                                    Title = newVacancy.Title,
                                    Description = newVacancy.Description,
                                    OpeningDate = newVacancy.OpeningDate,
                                    ForeignLanguage = newVacancy.ForeignLanguage,
                                    Requirments = newVacancy.Requirments,
                                    IsVisible = newVacancy.IsVisible,

                                   };
            db.Vacancies.Add(newVacancy);
            db.SaveChanges();
            return Json(new
            {   success = true,
                message = "Create method called successfully"
            });
        }

        [HttpPost]
        public ActionResult Update(string data)
        {
         System.Web.Script.Serialization.JavaScriptSerializer jss = new System.Web.Script.Serialization.JavaScriptSerializer();
         var deserializedData = jss.Deserialize<dynamic>(data);

         int id;

         object VakancyID = deserializedData["ID"];
         object Title = deserializedData["Title"];
         object Description = deserializedData["Description"];
         object OpeningDate = deserializedData["OpeningDate"];
         object ForeignLanguage = deserializedData["ForeignLanguage"];
         object Requirments = deserializedData["Requirments"];
 
         id = Convert.ToInt32(VakancyID.ToString());

         var rec = db.Vacancies.Where(a => a.VacancyID == id).SingleOrDefault();


         rec.Title = Title.ToString();
         rec.Description = Description.ToString();
         rec.OpeningDate = Convert.ToDateTime(OpeningDate.ToString());
         rec.ForeignLanguage = ForeignLanguage.ToString();
         rec.Requirments = Requirments.ToString();

         db.SaveChanges();  

         return Json(new
         {               
             success = true,
             message = "Update method called successfully"
         });
     }

        [HttpPost]
        public ActionResult Delete(string data)
        {
            System.Web.Script.Serialization.JavaScriptSerializer jss = new System.Web.Script.Serialization.JavaScriptSerializer();
            var deserializedData = jss.Deserialize<dynamic>(data);

            int id;

            object VakancyID = deserializedData["ID"];
            id = Convert.ToInt32(VakancyID.ToString());
            var rec = db.Vacancies.Where(a => a.VacancyID == id).SingleOrDefault();
            db.Vacancies.Remove(rec);
            db.SaveChanges();
            return Json(new
            {
                success = true,
                message = "Delete method called successfully"
            });
        }
    }
}
