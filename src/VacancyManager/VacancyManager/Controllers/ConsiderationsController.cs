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
                                         LastCommentBody =  Cons.Comments.DefaultIfEmpty(new Comment()).Last().Body,
                                         CommentsCount = Cons.Comments.Count

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

        public JsonResult Create(string considerations)
        {
            bool CreationSuccess = false;
            string CreationMessage = "Во время добавления соискателя произошла ошибка";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            Consideration CreatedConsideration = null;


            if (considerations != null)
            {
                var NewConsideration = jss.Deserialize<dynamic>(considerations);


                CreatedConsideration = ConsiderationsManager.CreateConsideration(Convert.ToInt32(NewConsideration["VacancyID"]),
                                                                                  Convert.ToInt32(NewConsideration["ApplicantID"])
                                                                                 );
                CreationMessage = "Соискатель успешно добавлен";
                CreationSuccess = true;
            }

            var ConsiderationsList = ConsiderationsManager.GetConsideration(CreatedConsideration.ConsiderationID);

            var NewConsiderations = (from cons in ConsiderationsList
                                    select new
                                    {
                                        cons.ApplicantID,
                                        cons.ConsiderationID,
                                        cons.VacancyID,
                                        FullName = cons.Applicant.FullName,
                                        LastCommentDate = (cons.Comments.Count == 0 ? "" : cons.Comments.DefaultIfEmpty(new Comment()).Last().CreationDate.ToShortDateString()),
                                        LastCommentBody = cons.Comments.DefaultIfEmpty(new Comment()).Last().Body,
                                        CommentsCount = cons.Comments.Count
                                    }).ToList();

            return Json(new
            {
                considerations = NewConsiderations,
                success = CreationMessage,
                message = CreationSuccess
            });



        }

        [HttpPost]
        public JsonResult Delete(string considerations)
        {
            bool d_success = false;
            string d_message = "Во время удаления соискателя произошла ошибка";

            JavaScriptSerializer jss = new JavaScriptSerializer();
            if (considerations != null)
            {
                var d_consideration = jss.Deserialize<dynamic>(considerations);

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

        public JsonResult GetApplicants(int vacancyId)
        {
            var applicantList = ApplicantManager.GetList();
            var considerations = ConsiderationsManager.GetConsiderations(vacancyId);
            var Requirments = RequirementsManager.GetRequirements().ToList();
            var ids = (from cons in considerations 
                       select cons.ApplicantID).ToArray();
            List<int> validValues = ids.ToList();
            var freeApplicantList = (from applicants in applicantList
                                     where !validValues.Contains(applicants.ApplicantID)
                                     select new
                                     {
                                         ApplicantID = applicants.ApplicantID,
                                         FullName = applicants.FullName,
                                         Requirements = (from req in applicants.ApplicantRequirements
                                                         join allrecs in Requirments on req.RequirementId equals allrecs.RequirementID
                                                         select allrecs.Name)
                                     }).ToList();
            return Json(new
            {
                freeapplicants = freeApplicantList,
                total = freeApplicantList.Count,
                success = true
            },
                       JsonRequestBehavior.AllowGet);
        }

        public ActionResult Index()
        {
            return View();
        }

    }
}
