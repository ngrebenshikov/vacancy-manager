using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Models;
using VacancyManager.Services.Managers;
using VacancyManager.Models.JSON;

namespace VacancyManager.Controllers
{
    public class ConsiderationsController : AdminController
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
                    success = success
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

        [HttpGet]
        public JsonResult Load(int id)
        {
            IEnumerable<Consideration> Considerations = ConsiderationsManager.GetConsiderations(id);
            var ConsiderationList = (from Cons in Considerations
                                     select new
                                     {
                                         Cons.ApplicantID,
                                         Cons.ConsiderationID,
                                         Cons.VacancyID,
                                         FullName = Cons.Applicant.FullName,
                                         ConsiderationStatusId = Cons.ConsiderationStatusID,
                                         Status = Cons.ConsiderationStatus.Status,
                                         LastCommentBody = Cons.Comments.DefaultIfEmpty(new Comment()).Last().Body,
                                         CommentsCount = Cons.Comments.Count,
                                         Cons.Applicant.Email,
                                         Vacancy = Cons.Vacancy.Title
                                     }).ToList();


            return Json(new
                          {
                              data = ConsiderationList,
                              total = ConsiderationList.Count,
                              success = true
                          },
                       JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(List<JsonConsideration> considerations)
        {
            bool CreationSuccess = false;
            string CreationMessage = "Во время добавления соискателя произошла ошибка";
            if (considerations != null)
            {
                foreach (JsonConsideration Cons in considerations)
                {
                    Tuple<string, bool> CreationStatus = Cons.AddToConsiderationsStore();
                    CreationMessage = CreationStatus.Item1;
                    CreationSuccess = CreationStatus.Item2;
                }
            }
            return Json(new { data = considerations, success = CreationSuccess, message = CreationMessage });
        }

        [HttpPost]
        public JsonResult Update(List<JsonConsideration> considerations)
        {
            bool UpdateSuccess = false;
            string UpdateMessage = "Во время добавления соискателя произошла ошибка";
            if (considerations != null)
            {
                foreach (JsonConsideration Cons in considerations)
                {
                    Tuple<string, bool> UpdateStatus = Cons.UpdateInConsiderationsStore();
                    UpdateMessage = UpdateStatus.Item1;
                    UpdateSuccess = UpdateStatus.Item2;
                }
            }
            return Json(new { data = considerations, success = UpdateSuccess, message = UpdateMessage });
        }

        [HttpPost]
        public JsonResult Delete(List<JsonConsideration> considerations)
        {
            bool d_success = false;
            string d_message = "Во время удаления соискателя произошла ошибка";
            if (considerations != null)
            {
                foreach (JsonConsideration Cons in considerations)
                {
                    Tuple<string, bool> DeleteStatus = Cons.DeleteFromConsiderationsStore();
                    d_message = DeleteStatus.Item1;
                    d_success = DeleteStatus.Item2;
                }
            }
            return Json(new  { success = d_success, message = d_message });
        }
    }
}
