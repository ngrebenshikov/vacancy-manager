using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using VacancyManager.Services.Managers;
using VacancyManager.Models;
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
        public ActionResult Create(string[] data)
        {
            bool success = false;
            string resultMessage = "Ошибка при добавлении навыка";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            List<object> CreatedReqs = new List<object>();
            ApplicantRequirement CreatedAppReq = new ApplicantRequirement();

            try
            {
              if (data != null)
                {
                for (int i = 0; i <= data.Length - 1; i++)
                {
                    var obj = jss.Deserialize<dynamic>(data[i]);
                    CreatedAppReq = ApplicantRequirementsManager.Create(obj["ApplicantId"], obj["RequirementId"], obj["CommentText"], obj["IsChecked"]);
                    resultMessage = "Навык успешно добавлен";
                    success = true;

                    CreatedReqs.Add(new
                    {
                        Id = CreatedAppReq.Id,
                        ApplicantId = obj["ApplicantId"],
                        StackId = obj["StackId"],
                        StackName = obj["StackName"],
                        RequirementId = obj["RequirementId"],
                        RequirementName = obj["RequirementName"],
                        CommentText = obj["CommentText"],
                        IsChecked = obj["IsChecked"]
                    });
                   }
                }
            }
            catch (Exception e)
            {
                resultMessage = e.Message;
            }

            return Json(new
            {
                success = success,
                data = CreatedReqs,
                message = resultMessage
            });
        }


        [HttpPost]
        public ActionResult Update(string[] data)
        {
            bool success = false;
            string resultMessage = "Ошибка при изменении навыка";
            JavaScriptSerializer jss = new JavaScriptSerializer();

            try
            {
                if (data != null)
                { 
                    for (int i = 0; i <= data.Length - 1; i++)
                    {
                        var obj = jss.Deserialize<dynamic>(data[i]);
                        ApplicantRequirementsManager.Update(obj["Id"], obj["CommentText"], obj["IsChecked"]);
                        resultMessage = "Навык успешно добавлен";
                        success = true;
                    }

                }
            }
            catch (Exception e)
            {
                resultMessage = e.Message;
            }

            return Json(new
            {
                success = success,
                message = resultMessage
            });
        }
    }
}
