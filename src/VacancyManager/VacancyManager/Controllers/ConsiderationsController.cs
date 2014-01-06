using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Services;
using VacancyManager.Models;
using VacancyManager.Services.Managers;
using System.Web.Script.Serialization;

namespace VacancyManager.Controllers
{
    public class ConsiderationsController : BaseController
    {
        //
        // GET: /Considerations/

        public JsonResult GetConsiderationAssign(string Email)
        {
            Applicant App = ApplicantManager.GetApplicantByEMail(Email);
            int AppId = 0;
            string succesMessage = "Нет вакансий для соискателя";
            bool success = false;
            if (App != null)
            {
                AppId = App.ApplicantID;
                succesMessage = "Вакансии успешно загружены";
                var Considerations = ConsiderationsManager.GetApplicantConsiderations(AppId);
                success = true;
                var ConsiderationList = (from Cons in Considerations
                                         select new
                                         {
                                             Cons.ApplicantID,
                                             Cons.ConsiderationID,
                                             Cons.VacancyID,
                                             Vacancy = Cons.Vacancy.Title
                                         }).ToList();
                return Json(new
                {
                    considerationsAssign = ConsiderationList,
                    total = ConsiderationList.Count,
                    message = succesMessage,
                    success = true
                },
           JsonRequestBehavior.AllowGet);
            }
            else
                return Json(new
                {
                    message = succesMessage,
                    success = success
                },
          JsonRequestBehavior.AllowGet);

        }


        public JsonResult Load(int id)
        {
            var Considerations = ConsiderationsManager.GetConsiderations(id);
            var ConsiderationList = (from Cons in Considerations
                                     select new
                                     {
                                         Cons.ApplicantID,
                                         Cons.ConsiderationID,
                                         Cons.VacancyID,
                                         FullName = Cons.Applicant.FullName,
                                         LastCommentDate = (Cons.Comments.Count == 0 ? "" : Cons.Comments.DefaultIfEmpty(new Comment()).Last().CreationDate.ToShortDateString()),
                                         LastCommentBody = Cons.Comments.DefaultIfEmpty(new Comment()).Last().Body,
                                         CommentsCount = Cons.Comments.Count,
                                         Cons.Applicant.Email,
                                         Vacancy = Cons.Vacancy.Title
                                     }).ToList();


            return Json(new
                          {
                              considerations = ConsiderationList,
                              total = ConsiderationList.Count,
                              success = true
                          },
                       JsonRequestBehavior.AllowGet);
        }

        [HttpPost]

        public JsonResult Create(string[] data)
        {
            bool CreationSuccess = false;
            string CreationMessage = "Во время добавления соискателя произошла ошибка";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            Consideration CreatedConsideration = null;
            int[] CreatedConsId = new int[data.Length];
            for (int i = 0; i <= data.Length - 1; i++)
            {
                if (data != null)
                {
                    var NewConsideration = jss.Deserialize<dynamic>(data[i]);

                    CreatedConsideration = ConsiderationsManager.CreateConsideration(Convert.ToInt32(NewConsideration["VacancyID"]),
                                                                                      Convert.ToInt32(NewConsideration["ApplicantID"])
                                                                                     );
                    CreatedConsId[i] = CreatedConsideration.ConsiderationID;
                    CreationMessage = "Соискатель успешно добавлен";
                    CreationSuccess = true;
                }
            }

            var ConsiderationsList = ConsiderationsManager.GetConsiderationsByIds(CreatedConsId);
            var NewConsiderations = (from cons in ConsiderationsList
                                     select new
                                    {
                                        cons.ApplicantID,
                                        cons.ConsiderationID,
                                        cons.VacancyID,
                                        FullName = cons.Applicant.FullName,
                                        LastCommentDate = (cons.Comments.Count == 0 ? "" : cons.Comments.DefaultIfEmpty(new Comment()).Last().CreationDate.ToShortDateString()),
                                        LastCommentBody = cons.Comments.DefaultIfEmpty(new Comment()).Last().Body,
                                        CommentsCount = cons.Comments.Count,
                                        cons.Applicant.Email,
                                        Vacancy = cons.Vacancy.Title
                                    }).ToList();

            return Json(new
            {
                considerations = NewConsiderations,
                success = CreationMessage,
                message = CreationSuccess
            });



        }

        [HttpPost]
        public JsonResult Delete(string data)
        {
            bool d_success = false;
            string d_message = "Во время удаления соискателя произошла ошибка";

            JavaScriptSerializer jss = new JavaScriptSerializer();
            if (data != null)
            {
                var d_consideration = jss.Deserialize<dynamic>(data);

                ConsiderationsManager.DeleteConsideration(Convert.ToInt32(d_consideration["ConsiderationID"]));
                d_message = "Соискатель успешно удален";
                d_success = true;
            }

            return Json(new
            {
                success = d_success,
                message = d_message
            });
        }

        public ActionResult Index()
        {
            return View();
        }

    }
}
