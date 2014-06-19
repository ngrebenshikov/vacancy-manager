using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Services.Managers;
using VacancyManager.Models;
using VacancyManager.Models.JSON;
using System.Web.Script.Serialization;

namespace VacancyManager.Controllers
{
    public class ResumeExperienceController : UserController
    {
        // GET: /ResumeExperience/
        JavaScriptSerializer jss = new JavaScriptSerializer();

        [HttpGet]
        public ActionResult GetResumeExperience(int ResId, bool isEdu)
        {
            IEnumerable<object> ExperienceList = null;
            var Experience = ResumeManager.GetResumeExperience(ResId);
            ExperienceList = (from exp in Experience
                              where exp.IsEducation == isEdu
                              select new
                              {
                                  ExperienceId = exp.ExperienceId,
                                  Job = exp.Job,
                                  Project = exp.Project,
                                  Position = exp.Position,
                                  ResumeId = exp.ResumeId,
                                  StartDate = exp.StartDate.Date.ToShortDateString(),
                                  FinishDate = exp.FinishDate.HasValue ? exp.FinishDate.Value.Date.ToShortDateString() : "",
                                  Duties = exp.Duties,
                                  IsEducation = exp.IsEducation
                              }).ToList();

            return Json(new { success = true, data = ExperienceList }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CreateExperience(JsonResumeExperience resumeExperience)
        {
            bool Success = false;
            string Message = "При изменении информации произошла ошибка";
            string ActiveUser = User.Identity.Name;
            bool CanChangeOrViewData = isAdminAccess == false ? ResumeManager.ValidateResumePermissions(resumeExperience.ResumeId, ActiveUser) : isAdminAccess;
            if (CanChangeOrViewData)
            {
                Tuple<string, bool> CreationStatus = resumeExperience.AddToResumeExperienceStore();
                Success = CreationStatus.Item2;
                Message = CreationStatus.Item1;
            }
            return Json(new { success = Success, data = resumeExperience, message = Message });
        }

        [HttpPost]
        public ActionResult UpdateExperience(JsonResumeExperience resumeExperience)
        {
            bool Success = false;
            string Message = "При изменении информации произошла ошибка";
            string ActiveUser = User.Identity.Name;
            bool CanChangeOrViewData = isAdminAccess == false ? ResumeManager.ValidateResumePermissions(resumeExperience.ResumeId, ActiveUser) : isAdminAccess;
            if (CanChangeOrViewData)
                {
                    Tuple<string, bool> UpdateStatus = resumeExperience.UpdateInResumeExperienceStore();
                    Success = UpdateStatus.Item2;
                    Message = UpdateStatus.Item1;
                }
            return Json(new { success = Success, experience = resumeExperience, message = Message });
        }

        [HttpPost]
        public ActionResult DeleteExperience(JsonResumeExperience resumeExperience)
        {
            bool Success = false;
            string Message = "При удалении информации произошла ошибка";
            bool CanChangeOrViewData = isAdminAccess;

                if (CanChangeOrViewData)
                {
                    Tuple<string, bool> DeleteStatus = resumeExperience.DeleteFromResumeExperienceStore();
                    Success = DeleteStatus.Item2;
                    Message = DeleteStatus.Item1;
                }
            return Json(new { success = Success,  message = Message });
        }

        [HttpGet]
        public JsonResult LoadExperienceRequirements(int id)
        {
            var RequirementsStackList = RequirementsManager.GetAllRequirementStacks().ToList();
            var RequirementsList = RequirementsManager.GetRequirements().ToList();
            IEnumerable<ExperienceRequirement> ExperienceRequirementsList = new List<ExperienceRequirement>();
            bool CanChangeOrViewData = isAdminAccess;
            IEnumerable<object> Complex = new List<object>();

               ExperienceRequirementsList = ResumeManager.GetExperienceRequirements(id).ToList();
               Complex = from o in RequirementsStackList
                         join v in RequirementsList on o.RequirementStackID equals v.RequirementStackID
                         join y in ExperienceRequirementsList on v.RequirementID equals y.RequirementId into a
                         from b in a.DefaultIfEmpty(new ExperienceRequirement())
                         select new
                         {
                             Id = (b.Id > -1 ? Convert.ToString(b.Id) : ""),
                             StackName = o.Name,
                             ExperienceId = b.ExperienceId,
                             RequirementStackID = v.RequirementStackID,
                             RequirementID = v.RequirementID,
                             RequirementName = v.Name,
                             Comments = b.Comment,
                             IsRequire = b.IsChecked
                         };
            

            return Json(new
            {
                ExperienceRequirements = Complex.ToList(),
                total = Complex.ToList().Count,
                success = true }, JsonRequestBehavior.AllowGet
            );
        }

        [HttpPost]
        public ActionResult CreateExperienceRequirements(string[] data)
        {
            bool CreateSuccess = false;
            string CreateMessage = "При изменении требований произошла ошибка";
            bool CanChangeOrViewData = isAdminAccess;

            if (data != null)
            {
                for (int i = 0; i <= data.Length - 1; i++)
                {
                    String Comments = "";
                    var c_exprequirement = jss.Deserialize<dynamic>(data[i]);
                    Int32 ExperienceId = Convert.ToInt32(c_exprequirement["ExperienceId"]),
                          RequirementID = Convert.ToInt32(c_exprequirement["RequirementID"]);
                    Boolean IsRequire = Convert.ToBoolean(c_exprequirement["IsRequire"]);
                    Resume EditingResume = ResumeManager.GetResumeByExperienceID(ExperienceId);
                    if (!CanChangeOrViewData)
                    {
                        CanChangeOrViewData = ApplicantManager.ValidateApplicant(EditingResume.ApplicantID, User.Identity.Name);
                    }

                    if (CanChangeOrViewData)
                    {
                        if (IsRequire)
                        {
                            Comments = c_exprequirement["Comments"].ToString();
                        }
                        ResumeManager.CreateExperienceRequirement(ExperienceId, RequirementID, Comments, IsRequire);
                        CreateSuccess = true;
                        CreateMessage = "Требования успешно созданы";
                    }
                }


            }

            return Json(new
            {
                success = CreateSuccess,
                message = CreateMessage
            });

        }

        [HttpPost]
        public ActionResult UpdateExperienceRequirements(string[] data)
        {
            bool CreateSuccess = false;
            string CreateMessage = "При изменении требований произошла ошибка";
            bool CanChangeOrViewData = isAdminAccess;

            if (data != null)
            {
                for (int i = 0; i <= data.Length - 1; i++)
                {
                    String Comments = "";
                    var u_exprequirement = jss.Deserialize<dynamic>(data[i]);
                    Int32 Id = Convert.ToInt32(u_exprequirement["Id"]),
                          RequirementID = Convert.ToInt32(u_exprequirement["RequirementID"]),
                          ExperienceId = Convert.ToInt32(u_exprequirement["ExperienceId"]);
                    Boolean IsRequire = Convert.ToBoolean(u_exprequirement["IsRequire"]);
                    Resume EditingResume = ResumeManager.GetResumeByExperienceID(ExperienceId);
                    if (!CanChangeOrViewData)
                    {
                        CanChangeOrViewData = ApplicantManager.ValidateApplicant(EditingResume.ApplicantID, User.Identity.Name);
                    }

                    if (CanChangeOrViewData)
                    {
                        if (IsRequire)
                        {
                            Comments = u_exprequirement["Comments"].ToString();
                        }

                        if (Id != 0) { ResumeManager.UpdateExperienceRequirement(Id, Comments, IsRequire); }
                        else { ResumeManager.CreateExperienceRequirement(ExperienceId, RequirementID, Comments, IsRequire); }
                        
                        CreateSuccess = true;
                        CreateMessage = "Требования успешно созданы";
                    }
                }


            }

            return Json(new
            {
                success = CreateSuccess,
                message = CreateMessage
            });

        }

    }
}
