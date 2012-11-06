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
    public class ConsiderationsController : Controller
    {
        //
        // GET: /Considerations/

        public JsonResult Load(int id)
        {
            var Considerations = ConsiderationsManager.GetConsidrations(id);
            var ConsiderationList = (from Cons in Considerations
                                     select new
                                     {
                                         Cons.ApplicantID,
                                         Cons.ConsiderationID,
                                         Cons.VacancyID,
                                         FullName = Cons.Applicant.FullName,
                                         LastCommentDate = (from Comms in Cons.Comments
                                                            select Comms.CreationDate).LastOrDefault().ToShortDateString(),
                                         LastCommentBody = (from Comms in Cons.Comments
                                                            select Comms.Body).LastOrDefault(),
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
            Consideration CreatedConsideration;


            if (considerations != null)
            {
                var NewConsideration = jss.Deserialize<dynamic>(considerations);


                CreatedConsideration = ConsiderationsManager.CreateConsideration(Convert.ToInt32(NewConsideration["VacancyID"]),
                                                          Convert.ToInt32(NewConsideration["ApplicantID"]));
                CreationMessage = "Соискатель успешно добавлен";
                CreationSuccess = true;
            }
            else
            { 
                CreatedConsideration = null; 
            }

            return Json(new
            {
                data = CreatedConsideration.ToString(),
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

        public ActionResult Index()
        {
            return View();
        }

    }
}
