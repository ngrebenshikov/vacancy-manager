using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using VacancyManager.Models;
using VacancyManager.Services.Managers;
using System.Web.Script.Serialization;
using VacancyManager.Services;
using System.Web.Security;
using System.IO;

namespace VacancyManager.Controllers
{
    [AuthorizeError(Roles = "Admin")]

    public class ApplicantController : BaseController
    {

        [HttpGet]
        public ActionResult LoadAppConsiderations(int AppId)
        {
            var AppCons = ConsiderationsManager.GetAppConsiderations(AppId);
            var AppConsList = (from appcons in AppCons
                               select new
                               {
                                  ApplicantID = appcons.ApplicantID,
                                  ConsiderationID = appcons.ConsiderationID,
                                  VacancyTitle = appcons.Vacancy.Title

                               }).ToList();
            return Json(new
            {
                success = true,
                data = AppConsList
            }, JsonRequestBehavior.AllowGet);
        }
        
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

        [HttpGet]
        public JsonResult GetSearchApplicants(int vacancyId)
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
                                                         where req.IsChecked == true
                                                         join allrecs in Requirments on req.RequirementId equals allrecs.RequirementID
                                                         select allrecs.Name),
                                         Vacancies = (from cons in applicants.Considerations
                                                      select cons.Vacancy.Title),
                                         Email = applicants.Email

                                     }).ToList();
            return Json(new
            {
                freeapplicants = freeApplicantList,
                total = freeApplicantList.Count,
                success = true
            },
                       JsonRequestBehavior.AllowGet);
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
