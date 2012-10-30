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
    public class ApplicantRequirementController : Controller
    {
        [HttpGet]
        public JsonResult LoadApplicantRequirements(int id)
        {
            var requirementsStackList = RequirementsManager.GetAllRequirementStacks().ToList();
            var requirementsList = RequirementsManager.GetRequirements().ToList();
            var applicantRequirementsList = ApplicantRequirementsManager.GetApplicantRequirements(id);

            List<object> result = new List<object>();

            if (applicantRequirementsList != null)
            {
                foreach (var req in requirementsList)
                {
                    var stack = (from stackList in requirementsStackList
                                 where stackList.RequirementStackID == req.RequirementStackID
                                 select new
                                 {
                                     Id = stackList.RequirementStackID,
                                     Name = stackList.Name
                                 }).ToList();


                    var appReqList = (from appReq in applicantRequirementsList
                                      where appReq.RequirementId == req.RequirementID
                                      select new
                                      {
                                          Id = appReq.Id,
                                          ApplicantId = appReq.ApplicantId,
                                          Comment = appReq.Comment
                                      }).ToList();

                    if (appReqList.Count > 0)
                        result.Add(new
                        {
                            StackId = stack[0].Id,
                            StackName = stack[0].Name,
                            RequirementId = req.RequirementID,
                            RequirementName = req.Name,
                            CommentText = appReqList[0].Comment,
                            CurrentId = appReqList[0].Id,
                            IsChecked = true
                        });
                    else
                        result.Add(new
                        {
                            StackId = stack[0].Id,
                            StackName = stack[0].Name,
                            RequirementId = req.RequirementID,
                            RequirementName = req.Name,
                            CommentText = "",
                            CurrentId = -1,
                            IsChecked = false
                        });
                }
            }
            else
            {
                foreach (var req in requirementsList)
                {
                    var stack = (from stackList in requirementsStackList
                                 where stackList.RequirementStackID == req.RequirementStackID
                                 select new
                                 {
                                     Id = stackList.RequirementStackID,
                                     Name = stackList.Name
                                 }).ToList();

                    result.Add(new
                    {
                        StackId = stack[0].Id,
                        StackName = stack[0].Name,
                        RequirementId = req.RequirementID,
                        RequirementName = req.Name,
                        CommentText = "",
                        CurrentId = -1,
                        IsChecked = false
                    });
                }

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
