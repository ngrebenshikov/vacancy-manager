using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Models;
using VacancyManager.Services.Managers;
using System.Web.Script.Serialization;

namespace VacancyManager.Controllers
{
    public class ApplicantController : Controller
    {
        [HttpGet]
        public ActionResult Load()
        {
            var list = ApplicantManager.GetList();
            var obj = from applicant in list
                      select new
                      {
                          ApplicantID = applicant.ApplicantID,
                          FullName = applicant.FullName,
                          ContactPhone = applicant.ContactPhone,
                          Email = applicant.Email
                      };

            return Json(new
            {
                success = true,
                data = obj
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Create(string data)
        {
            bool success = false;
            string resultMessage = "Ошибка при добавлении соискателя";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            List<Applicant> created = new List<Applicant>();
            ActionResult result = null;

            #region Так у вакансий
            if (data != null)
            {
                var obj = jss.Deserialize<dynamic>(data);
                created = ApplicantManager.Create(obj["FullName"].ToString(), obj["ContactPhone"].ToString(), obj["Email"].ToString());
                resultMessage = "Соискатель конфигурации успешно добавлен";
                success = true;
            }
            else
                created = null;
            #endregion

            #region Так у меня

            //if (data != null)
            //{
            //    var obj = jss.Deserialize<dynamic>(data);

            //    if (obj["params"]["id"] < 0)
            //    {
            //        var appObj = obj["params"]["data"];
            //        created = ApplicantManager.Create(appObj["FullName"].ToString(), appObj["ContactPhone"].ToString(), appObj["Email"].ToString());
            //        resultMessage = "Соискатель конфигурации успешно добавлен";
            //        success = true;

            //        var appReqObj = obj["params"]["grid"];
            //        for (int i = 0; i <= appReqObj.Length - 1; i++)
            //            if (appReqObj[i]["IsChecked"])
            //                ApplicantRequirementsManager.Create(created[0].ApplicantID, appReqObj[i]["RequirementId"], appReqObj[i]["CommentText"]);

            //        result = Json(new
            //            {
            //                success = success,
            //                data = created,
            //                message = resultMessage
            //            }, JsonRequestBehavior.DenyGet);
            //    }
            //    else
            //    {
            //        result = Update(data);
            //    }
            //}
            //else
            //{
            //    created = null;
            //    result = Json(new
            //    {
            //        success = success,
            //        data = created,
            //        message = resultMessage
            //    }, JsonRequestBehavior.DenyGet);
            //}

            #endregion

            result = Json(new
                {
                    success = success,
                    data = created,
                    message = resultMessage
                });
            return result;
        }

        [HttpPost]
        public ActionResult Delete(string data)
        {
            bool success = false;
            string resultMessage = "Ошибка при удалении соискателя";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            if (data != null)
            {
                var obj = jss.Deserialize<dynamic>(data);
                ApplicantManager.Delete(obj["ApplicantID"]);
                resultMessage = "Соискатель успешно удален";
                success = true;
            }

            return Json(new
            {
                success = success,
                message = resultMessage
            });
        }

        [HttpPost]
        public ActionResult Update(string data)
        {
            bool success = false;
            string resultMessage = "Ошибка при изменении соискателя";
            JavaScriptSerializer jss = new JavaScriptSerializer();

            if (data != null)
            {
                var obj = jss.Deserialize<dynamic>(data);

                int appId = obj["params"]["id"];

                var appObj = obj["params"]["data"];
                ApplicantManager.Update(appId, appObj["FullName"].ToString(), appObj["ContactPhone"].ToString(), appObj["Email"].ToString());
                resultMessage = "Cоискатель успешно изменен";
                success = true;

                var appReqObj = obj["params"]["grid"];
                for (int i = 0; i <= appReqObj.Length - 1; i++)
                    if (appReqObj[i]["IsChecked"] && appReqObj[i]["CurrentId"] > 0)
                        ApplicantRequirementsManager.Update(appReqObj[i]["CurrentId"], appReqObj[i]["CommentText"]);
                    //else if (appReqObj[i]["IsChecked"] && appReqObj[i]["CurrentId"] < 0)
                    //    ApplicantRequirementsManager.Create(appId, appReqObj[i]["RequirementId"], appReqObj[i]["CommentText"]);
                    else if (!appReqObj[i]["IsChecked"] && appReqObj[i]["CurrentId"] > 0)
                        ApplicantRequirementsManager.Delete(appReqObj[i]["CurrentId"]);
            }

            return Json(new
            {
                success = success,
                message = resultMessage
            });
        }
    }
}
