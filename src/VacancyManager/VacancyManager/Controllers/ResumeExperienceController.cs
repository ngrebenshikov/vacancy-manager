using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Services.Managers;
using VacancyManager.Models;
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
            bool CanChangeOrViewData = isAdminAccess;
            IEnumerable<object> ExperienceList = null;
            Resume ViewResume = ResumeManager.GetResumeByID(ResId);
            if (!CanChangeOrViewData)
            {
                CanChangeOrViewData = ApplicantManager.IsValidApplicant(ViewResume.ApplicantID, User.Identity.Name);
            }
            if (CanChangeOrViewData)
            {
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
            }

            return Json(new
            {
                success = true,
                experience = ExperienceList
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CreateExperience(string data)
        {

            bool CreateSuccess = false;
            string CreateMessage = "При изменении информации произошла ошибка";
            DateTime? finishDate = null;
            Experience Exp = new Experience();
            object newExp = null;

            bool CanChangeOrViewData = isAdminAccess;
            if (data != null)
            {

                var с_ResumeExp = jss.Deserialize<dynamic>(data);

                Resume editingResume = ResumeManager.GetResumeByID(Convert.ToInt32(с_ResumeExp["ResumeId"]));

                if (!CanChangeOrViewData)
                {
                    CanChangeOrViewData = ApplicantManager.IsValidApplicant(editingResume.ApplicantID, User.Identity.Name);
                }

                if (CanChangeOrViewData)
                {

                    if ((с_ResumeExp["FinishDate"] != "") && с_ResumeExp["FinishDate"] != null) finishDate = Convert.ToDateTime(с_ResumeExp["FinishDate"]);
                    Exp = ResumeManager.CreateResumeExperience(Convert.ToInt32(с_ResumeExp["ResumeId"]),
                                                         с_ResumeExp["Duties"].ToString(),
                                                         finishDate,
                                                         Convert.ToBoolean(с_ResumeExp["IsEducation"]),
                                                         с_ResumeExp["Job"].ToString(),
                                                         с_ResumeExp["Position"].ToString(),
                                                         с_ResumeExp["Project"].ToString(),
                                                         Convert.ToDateTime(с_ResumeExp["StartDate"]));


                    CreateSuccess = true;
                    CreateMessage = "Информация об опыте успешно добавлена"; ;
                }

                newExp = new
                {
                    ExperienceId = Exp.ExperienceId,
                    Job = Exp.Job,
                    Project = Exp.Project,
                    Position = Exp.Position,
                    ResumeId = Exp.ResumeId,
                    StartDate = Exp.StartDate.Date.ToShortDateString(),
                    FinishDate = (finishDate != null ? Exp.FinishDate.Value.Date.ToShortDateString() : ""),
                    Duties = Exp.Duties,
                    IsEducation = Exp.IsEducation
                };
            }

            return Json(new
            {
                success = CreateSuccess,
                experience = newExp,
                message = CreateMessage
            });

        }

        [HttpPost]
        public ActionResult UpdateExperience(string data)
        {
            bool UpdateSuccess = false;
            string UpdateMessage = "При изменении информации произошла ошибка";
            DateTime? finishDate = null;
            Experience Exp = new Experience();
            object newExp = null;
            bool CanChangeOrViewData = isAdminAccess;
            if (data != null)
            {
                var с_ResumeExp = jss.Deserialize<dynamic>(data);
                Resume EditingResume = ResumeManager.GetResumeByID(Convert.ToInt32(с_ResumeExp["ResumeId"]));
                if (!CanChangeOrViewData)
                {
                    CanChangeOrViewData = ApplicantManager.IsValidApplicant(EditingResume.ApplicantID, User.Identity.Name);
                }
                if (CanChangeOrViewData)
                {
                    if ((с_ResumeExp["FinishDate"] != "") && с_ResumeExp["FinishDate"] != null) finishDate = Convert.ToDateTime(с_ResumeExp["FinishDate"]);
                    Exp = ResumeManager.UpdateResumeExperience(Convert.ToInt32(с_ResumeExp["ExperienceId"]),
                                                         с_ResumeExp["Duties"].ToString(),
                                                         finishDate,
                                                         Convert.ToBoolean(с_ResumeExp["IsEducation"]),
                                                         с_ResumeExp["Job"].ToString(),
                                                         с_ResumeExp["Position"].ToString(),
                                                         с_ResumeExp["Project"].ToString(),
                                                         Convert.ToDateTime(с_ResumeExp["StartDate"]));
                    UpdateSuccess = true;
                    UpdateMessage = "Информация об опыте успешно изменена";
                    newExp = new
                    {
                        ExperienceId = Exp.ExperienceId,
                        Job = Exp.Job,
                        Project = Exp.Project,
                        Position = Exp.Position,
                        ResumeId = Exp.ResumeId,
                        StartDate = Exp.StartDate.Date.ToShortDateString(),
                        FinishDate = (finishDate != null ? Exp.FinishDate.Value.Date.ToShortDateString() : ""),
                        Duties = Exp.Duties,
                        IsEducation = Exp.IsEducation
                    };
                }
            }
            return Json(new
            {
                success = UpdateSuccess,
                experience = newExp,
                message = UpdateMessage
            });
        }

        [HttpPost]
        public ActionResult DeleteExperience(string data)
        {
            bool DeleteSuccess = false;
            string DeleteMessage = "При удалении информации произошла ошибка";
            bool CanChangeOrViewData = isAdminAccess;
            if (data != null)
            {
                var d_ResumeExp = jss.Deserialize<dynamic>(data);
                Resume EditingResume = ResumeManager.GetResumeByID(Convert.ToInt32(d_ResumeExp["ResumeId"]));
                if (!CanChangeOrViewData)
                {
                    CanChangeOrViewData = ApplicantManager.IsValidApplicant(EditingResume.ApplicantID, User.Identity.Name);
                }
                if (CanChangeOrViewData)
                {
                    ResumeManager.DeleteResumeExperience(Convert.ToInt32(d_ResumeExp["ExperienceId"]));
                    DeleteSuccess = true;
                    DeleteMessage = "Информация об опыте успешно удалена";
                }
            }

            return Json(new
            {
                success = DeleteSuccess,
                message = DeleteMessage
            });

        }

        [HttpGet]
        public JsonResult LoadExperienceRequirements(int id)
        {
            var RequirementsStackList = RequirementsManager.GetAllRequirementStacks().ToList();
            var RequirementsList = RequirementsManager.GetRequirements().ToList();
            IEnumerable<ExperienceRequirement> ExperienceRequirementsList = new List<ExperienceRequirement>();
            bool CanChangeOrViewData = isAdminAccess;
            IEnumerable<object> Complex = new List<object>();

            if (CanChangeOrViewData)
            {
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
            }

            return Json(new
            {
                ExperienceRequirements = Complex.ToList(),
                total = Complex.ToList().Count,
                success = true
            }, JsonRequestBehavior.AllowGet
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
                        CanChangeOrViewData = ApplicantManager.IsValidApplicant(EditingResume.ApplicantID, User.Identity.Name);
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
                        CanChangeOrViewData = ApplicantManager.IsValidApplicant(EditingResume.ApplicantID, User.Identity.Name);
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
