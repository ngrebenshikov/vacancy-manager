using System;
using System.Linq;
using System.Web.Mvc;
using VacancyManager.Models;
using VacancyManager.Models.JSON;
using VacancyManager.Services;
using System.Web.Script.Serialization;
using VacancyManager.Services.Managers;
using System.Collections.Generic;

namespace VacancyManager.Controllers
{
    public class ResumeRequirementController : UserController
    {
        JavaScriptSerializer jss = new JavaScriptSerializer();

        [HttpGet]
        public JsonResult Load(int id)
        {
            var RequirementsStackList = RequirementsManager.GetAllRequirementStacks().ToList();
            var RequirementsList = RequirementsManager.GetRequirements().ToList();
            Resume ViewResume = ResumeManager.GetResumeByID(id);
            IEnumerable<ResumeRequirement> ResumeRequirementsList = null;
            IEnumerable<object> Complex = new List<object>();

            bool CanChangeOrViewData = isAdminAccess;
            if (!CanChangeOrViewData)
            {
                CanChangeOrViewData = ApplicantManager.ValidateApplicant(ViewResume.ApplicantID, User.Identity.Name);
            }

            if (CanChangeOrViewData)
            {
                ResumeRequirementsList = ResumeManager.GetResumeRequirements(id).ToList();

                Complex = from o in RequirementsStackList
                          join v in RequirementsList on o.RequirementStackID equals v.RequirementStackID
                          join y in ResumeRequirementsList on v.RequirementID equals y.RequirementId into a
                          from b in a.DefaultIfEmpty(new ResumeRequirement())
                          select new
                          {
                              Id = (b.Id > -1 ? Convert.ToString(b.Id) : ""),
                              StackName = o.Name,
                              ResumeId = id,
                              RequirementStackID = v.RequirementStackID,
                              RequirementID = v.RequirementID,
                              RequirementName = v.Name,
                              Comments = b.Comment,
                              IsRequire = b.IsChecked
                          };
            }

            return Json(new
            {
                data = Complex.ToList(),
                total = Complex.ToList().Count,
                success = true
            }, JsonRequestBehavior.AllowGet
            );
        }


        [HttpPost]
        public ActionResult Create(List<JsonResumeRequirement> resumeRequirements)
        {
            bool Success = false;
            string Message = "При изменении требований произошла ошибка";
            string ActiveUser = User.Identity.Name;
            foreach (JsonResumeRequirement resumeRequirement in resumeRequirements)
            {
                Resume EditingResume = ResumeManager.GetResumeByID(resumeRequirement.ResumeId);
                bool CanChangeOrViewData = isAdminAccess == false ? ApplicantManager.ValidateApplicant(EditingResume.ApplicantID, ActiveUser): isAdminAccess;          
                if (CanChangeOrViewData)
                {
                    Tuple<string, bool> Status = resumeRequirement.UpdateInResumeRequirementsStore();
                    Success = Status.Item2;
                    Message = Status.Item1;
                }
            }
            return Json(new { success = Success,  data = resumeRequirements,  message = Message });
        }

        [HttpPost]
        public ActionResult Update(List<JsonResumeRequirement> resumeRequirements)
        {
            bool Success = false;
            string Message = "При изменении требований произошла ошибка";
            string ActiveUser = User.Identity.Name;
            foreach (JsonResumeRequirement resumeRequirement in resumeRequirements)
            {
                Resume EditingResume = ResumeManager.GetResumeByID(resumeRequirement.ResumeId);
                bool CanChangeOrViewData = isAdminAccess == false ? ApplicantManager.ValidateApplicant(EditingResume.ApplicantID, ActiveUser) : isAdminAccess;
                if (CanChangeOrViewData)
                {
                    Tuple<string, bool> Status = resumeRequirement.UpdateInResumeRequirementsStore();
                    Success = Status.Item2;
                    Message = Status.Item1;
                }
            }
            return Json(new { success = Success, data = resumeRequirements, message = Message });
        }
    }
}