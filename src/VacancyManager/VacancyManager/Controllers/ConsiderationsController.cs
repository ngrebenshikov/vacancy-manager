using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Services;
using VacancyManager.Services.Managers;
using System.Web.Script.Serialization;

namespace VacancyManager.Controllers
{
    public class ConsiderationsController : Controller
    {
        //
        // GET: /Considerations/

        public JsonResult LoadConsiderations(int id)
        {
            var Considerations = ConsiderationsManager.GetConsidrations(id);
            var ConsiderationList = (from Cons in Considerations
                                    select new
                                    { 
                                        Cons.ApplicantID,
                                        Cons.ConsiderationID,
                                        Cons.VacancyID,
                                        Cons.User.UserID,
                                        UserFullName = "UserFullName",
                                        LastCommentDate = "LastCommentDate",
                                        LastCommentBody = (from Comms in Cons.Comments
                                                           select Comms.Body
                                                               ),
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
        public JsonResult DeleteConsideration(string considerations)
        {
            bool d_success = false;
            string d_message = "Во время удаления соискателя произошла ошибка";

            JavaScriptSerializer jss = new JavaScriptSerializer();
            if (considerations != null)
            {
                var d_consideration = jss.Deserialize<dynamic>(considerations);

                ConsiderationsManager.DeleteConsidration(Convert.ToInt32(d_consideration["ConsiderationID"]));
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
