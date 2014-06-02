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
using VacancyManager.Models.JSON;
using System.Xml;


namespace VacancyManager.Controllers
{

    public class ApplicantController : UserController
    {

        [HttpGet]
        public ActionResult LoadAppMessages(int AppId, int ConsId)
        {
            var list = VMMailMessageManager.GetList();
            var conslist = ConsiderationsManager.GetAppConsiderations(AppId);

            var res = (from apps in list
                       where (apps.ApplicantId == AppId)
                       orderby apps.SendDate descending
                       select new
                       {
                           Id = apps.Id,
                           Subject = apps.Subject,
                           From = apps.From,
                           Text = apps.Text,
                           IsRead = apps.IsRead,
                           //   Vacancy = (from cons in conslist
                           //             where apps.ConsiderationId == cons.ConsiderationID
                           //             select cons.Vacancy.Title).Single(),
                           ConsiderationId = apps.ConsiderationId,
                           SendDate = apps.SendDate,
                           DeliveryDate = apps.DeliveryDate.Date.ToShortDateString(),
                           Sender = String.Format("{0} ({1})", " ", apps.From)

                       }).ToList();

            if (ConsId != 0)
            { res = res.Where(cons => cons.ConsiderationId == ConsId).ToList(); }

            return Json(new
            {
                success = true,
                data = res
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult LoadAppConsiderations(int AppId)
        {
            var AppCons = ConsiderationsManager.GetAppConsiderations(AppId);
            var AppConsList = (from appcons in AppCons
                               select new
                               {
                                   ApplicantID = appcons.ApplicantID,
                                   ConsiderationID = appcons.ConsiderationID,
                                   Vacancy = appcons.Vacancy.Title,
                                   Status = appcons.ConsiderationStatus.Status
                               }).ToList();
            return Json(new
            {
                success = true,
                considerations = AppConsList
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CreateApplicantConsideration(string data)
        {
            bool CreationSuccess = false;
            string CreationMessage = "Во время добавления соискателя произошла ошибка";
            Consideration CreatedConsideration = null;
            object NewConsideration = null;
            Vacancy Vac = new Vacancy();
            JavaScriptSerializer jss = new JavaScriptSerializer();
            if (data != null)
            {
                var newConsideration = jss.Deserialize<dynamic>(data);
                Vac = VacancyDbManager.GetVacancy(newConsideration["Vacancy"].ToString());
                int ApplicantID = Convert.ToInt32(newConsideration["ApplicantID"]),
                    VacancyID = Vac.VacancyID;

                if ((VacancyID != 0) && (ApplicantID != 0))
                {
                    if (!ConsiderationsManager.IsApplicantConsiderationExist(ApplicantID, VacancyID))
                    {

                        CreatedConsideration = ConsiderationsManager.CreateConsideration(VacancyID, ApplicantID);

                        NewConsideration = new
                        {
                            ApplicantID = CreatedConsideration.ApplicantID,
                            ConsiderationID = CreatedConsideration.ConsiderationID,
                            Vacancy = Vac.Title,
                            Status = CreatedConsideration.ConsiderationStatus

                        };

                        CreationMessage = "Соискатель успешно добавлен";
                        CreationSuccess = true;
                    }
                }
            }


            return Json(new
            {
                considerations = NewConsideration,
                success = CreationSuccess,
                message = CreationMessage
            });
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
                    FullNameEn = applicant.FullNameEn,
                    ContactPhone = applicant.ContactPhone,
                    Employed = applicant.Employed,
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
                                         Employed = applicants.Employed,
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
        public ActionResult Create(JsonApplicant applicant)
        {
            bool success = false;
            string resultMessage = "Ошибка при добавлении соискателя";
            if (applicant != null)
            {
                Tuple<string, bool> CreationStatus = applicant.AddToApplicantsStore();
                resultMessage = CreationStatus.Item1;
                success = CreationStatus.Item2;
            }

            return Json(new { success = success, data = applicant, message = resultMessage });
        }

        [HttpPost]
        public ActionResult Delete(JsonApplicant applicant)
        {
            bool success = false;
            string resultMessage = "Ошибка при удалении соискателя";
            bool CanChangeOrViewData = UserCanExecuteAction;
            if (applicant != null)
            {
                 if (!CanChangeOrViewData)
                {
                    CanChangeOrViewData = ApplicantManager.IsValidApplicant(applicant.ApplicantID, User.Identity.Name);
                }
                if (CanChangeOrViewData)
                {
                    Tuple<string, bool> DeleteStatus = applicant.DeleteFromApplicantsStore();
                    resultMessage = DeleteStatus.Item1;
                    success = DeleteStatus.Item2;
                }
            }
            return Json(new {  success = success,  message = resultMessage });
        }

        [HttpPost]
        public ActionResult Update(JsonApplicant applicant)
        {
            bool success = false;
            string resultMessage = "Ошибка при изменении соискателя";
            if (applicant != null)
            {
                Tuple<string, bool> UpdateStatus = applicant.UpdateInApplicantsStore();
                resultMessage = UpdateStatus.Item1;
                success = UpdateStatus.Item2;
            }
            return Json(new { success = success, data = applicant, message = resultMessage });
        }
    }
}
