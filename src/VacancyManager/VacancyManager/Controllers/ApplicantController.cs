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
                                   Vacancy = appcons.Vacancy.Title
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
                            Vacancy = Vac.Title
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
        public ActionResult Create(string data)
        {
            bool success = false;
            string resultMessage = "Ошибка при добавлении соискателя";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            Applicant created = new Applicant();

            if (data != null)
            {
                var obj = jss.Deserialize<dynamic>(data);
                created = ApplicantManager.Create(obj["FullName"].ToString(), obj["FullNameEn"].ToString(), obj["ContactPhone"].ToString(), obj["Email"].ToString(), obj["Employed"]);
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
            bool CanChangeOrViewData = UserCanExecuteAction;
            if (data != null)
            {
                var obj = jss.Deserialize<dynamic>(data);
                if (!CanChangeOrViewData)
                {
                    CanChangeOrViewData = ApplicantManager.IsValidApplicant(obj["ApplicantID"], User.Identity.Name);
                }
                if (CanChangeOrViewData)
                {
                    ApplicantManager.Delete(obj["ApplicantID"]);
                    resultMessage = "Соискатель успешно удален";
                    success = true;
                }
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
            Applicant App = new Applicant();
            object updated = null;

            if (data != null)
            {
                var obj = jss.Deserialize<dynamic>(data);
                App = ApplicantManager.Update(obj["ApplicantID"], obj["FullName"], obj["FullNameEn"], obj["ContactPhone"], obj["Email"], obj["Employed"]);
                resultMessage = "Соискатель успешно изменен";
                success = true;
            }

            updated = new
            {
                ApplicantID = App.ApplicantID,
                FullName = App.FullName,
                FullNameEn = App.FullNameEn,
                ContactPhone = App.ContactPhone,
                Employed = App.Employed,
                Email = App.Email,
                Requirements = ""
            };

            return Json(new
            {
                success = success,
                data = updated,
                message = resultMessage
            });
        }

    }
}
