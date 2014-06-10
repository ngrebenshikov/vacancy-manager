using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using VacancyManager.Services.Managers;
using VacancyManager.Models;
using VacancyManager.Models.JSON;
using System.Web.Script.Serialization;
using System.IO;
using VacancyManager.Services;

namespace VacancyManager.Controllers
{

    public class ApplicantRequirementController : UserController
    {
        [HttpGet]
        public JsonResult Load(int id)
        {
            var requirementsStackList = RequirementsManager.GetAllRequirementStacks().ToList();
            var requirementsList = RequirementsManager.GetRequirements().ToList();
            var applicantRequirementsList = ApplicantRequirementsManager.GetListByApplicantId(id);

            List<object> result = new List<object>();

            if (id > 0)
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
                                          ApplicantId = id,
                                          Comment = appReq.Comment,
                                          IsChecked = appReq.IsChecked
                                      }).ToList();

                    if (appReqList.Count > 0)
                        result.Add(new
                        {
                            Id = appReqList[0].Id,
                            ApplicantId = appReqList[0].ApplicantId,
                            StackId = stack[0].Id,
                            StackName = stack[0].Name,
                            RequirementId = req.RequirementID,
                            RequirementName = req.Name,
                            CommentText = appReqList[0].Comment,
                            IsChecked = appReqList[0].IsChecked
                        });
                    else
                        result.Add(new
                        {
                            Id = "",
                            StackId = stack[0].Id,
                            ApplicantId = id,
                            StackName = stack[0].Name,
                            RequirementId = req.RequirementID,
                            RequirementName = req.Name,
                            CommentText = "",
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
                        Id = "",
                        StackId = stack[0].Id,
                        StackName = stack[0].Name,
                        RequirementId = req.RequirementID,
                        RequirementName = req.Name,
                        CommentText = "",
                        IsChecked = false
                    });
                }

            }

            return Json(new
            {
                success = true,
                data = result,
                total = result.Count
            }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult Create(List<JsonApplicantRequirement> applicantRequirements)
        {
            bool Success = false;
            string ResultMessage = "Ошибка при добавлении навыка";
            if (applicantRequirements != null)
            {
              foreach (JsonApplicantRequirement applicantRequirement in applicantRequirements)
                {
                    Tuple<string, bool> CreateStatus = applicantRequirement.UpdateInApplicantRequirementsStore();
                    ResultMessage = CreateStatus.Item1;
                    Success = CreateStatus.Item2;
                }
            }
             return Json(new  { success = Success, data = applicantRequirements, message = ResultMessage });
        }


        [HttpPost]
        public ActionResult Update(List<JsonApplicantRequirement> applicantRequirements)
        {
            bool Success = false;
            string ResultMessage = "Ошибка при изменении навыка";
            if (applicantRequirements != null)
            {
                foreach (JsonApplicantRequirement applicantRequirement in applicantRequirements)
                {
                    Tuple<string, bool> CreateStatus = applicantRequirement.UpdateInApplicantRequirementsStore();
                    ResultMessage = CreateStatus.Item1;
                    Success = CreateStatus.Item2;
                }
            }
            return Json(new { success = Success, data = applicantRequirements, message = ResultMessage });
        }
    }
}
