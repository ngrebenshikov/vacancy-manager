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
            var reqList = RequirementsManager.GetRequirements();
            List<object> result = new List<object>();

            foreach (var applicant in list)
            {
                string reqText = "";
                var appReqList = ApplicantRequirementsManager.GetListByApplicantId(applicant.ApplicantID);
                foreach (var appReq in appReqList)
                {
                    if (appReq.IsChecked)
                    {
                        var reqName = (from req in reqList
                                      where req.RequirementID == appReq.RequirementId
                                      select req.Name).ToList();
                        reqText += reqName[0] + ", ";
                    }
                }

                result.Add(new
                {
                    ApplicantID = applicant.ApplicantID,
                    FullName = applicant.FullName,
                    ContactPhone = applicant.ContactPhone,
                    Email = applicant.Email,
                    Requirements = reqText.Length > 0 ? reqText.Remove(reqText.Length - 2) : "-"
                });
            }

            return Json(new
            {
                success = true,
                data = result
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Create(string data)
        {
            bool success = false;
            string resultMessage = "Ошибка при добавлении соискателя";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            List<Applicant> created = new List<Applicant>();

            if (data != null)
            {
                var obj = jss.Deserialize<dynamic>(data);
                created = ApplicantManager.Create(obj["FullName"].ToString(), obj["ContactPhone"].ToString(), obj["Email"].ToString());
                resultMessage = "Соискатель успешно добавлен";
                success = true;
            }
            else
                created = null;

            return Json(new
                {
                    success = success,
                    data = created,
                    message = resultMessage
                });
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
                ApplicantManager.Update(obj["ApplicantID"], obj["FullName"], obj["ContactPhone"], obj["Email"]);
                resultMessage = "Соискатель успешно изменен";
                success = true;
            }

            return Json(new
            {
                success = success,
                message = resultMessage
            });
        }
    }
}
