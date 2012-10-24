using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Services.Managers;
using VacancyManager.Models;

namespace VacancyManager.Controllers
{
    public class ApplicantRequirementsController : Controller
    {
        [HttpGet]
        public JsonResult LoadApplicantRequirements(int id)
        {
            var requirementsStackList = RequirementsManager.GetAllRequirementStacks().ToList();
            var requirementsList = RequirementsManager.GetRequirements().ToList();
            var applicantRequirementsList = ApplicantRequirementsManager.GetApplicantRequirements(id).ToList();

            List<object> result = new List<object>();

            foreach (var req in requirementsList)
            {
                var stack = (from stackList in requirementsStackList
                             where stackList.RequirementStackID == req.RequirementStackID
                             select new
                             {
                                 Id = stackList.RequirementStackID,
                                 Name = stackList.Name
                             }).ToList();

                if (applicantRequirementsList.Count > 0)
                {
                    var appReq = (from appReqList in applicantRequirementsList
                                  where appReqList.RequirementId == req.RequirementID
                                  select new
                                  {
                                      Comment = appReqList.Comment,
                                      IsChecked = true
                                  }).ToList();

                    result.Add(new
                    {
                        StackId = stack[0].Id,
                        StackName = stack[0].Name,
                        RequirementId = req.RequirementID,
                        RequirementName = req.Name,
                        CommentText = appReq[0].Comment,
                        IsChecked = true
                    });
                }
                else
                    result.Add(new
                    {
                        StackId = stack[0].Id,
                        StackName = stack[0].Name,
                        RequirementId = req.RequirementID,
                        RequirementName = req.Name,
                        CommentText = "no comment",
                        IsChecked = false
                    });
            }

            return Json(new
            {
                success = true,
                ApplicantRequirements = result,
                total = result.Count
            }, JsonRequestBehavior.AllowGet);
        }

    }
}
