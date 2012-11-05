using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Services.Managers;
using VacancyManager.Models;
using System.Web.Script.Serialization;
using System.IO;

namespace VacancyManager.Controllers
{
    public class ApplicantRequirementController : Controller
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
                                          ApplicantId = appReq.ApplicantId,
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
        public ActionResult Create()
        {
            bool success = false;
            string resultMessage = "Ошибка при добавлении навыка";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            StreamReader reader = new StreamReader(HttpContext.Request.InputStream);
            string data = reader.ReadToEnd();

            try
            {
                if (data != null)
                {
                    var objArray = jss.Deserialize<dynamic>(data);

                    // Проверка на тип данных нужна из-за формата приходящих данных.
                    // Если у нас в списке "Требования" один элемент,
                    // то после десериализации переменная objArray имеет тип Dictionary<string, object>,
                    // когда больше одного элемента, то - object[].
                    if (objArray is object[])
                        foreach (var obj in objArray)
                        {
                            //var obj = jss.Deserialize<dynamic>(o);
                            ApplicantRequirementsManager.Create(obj["ApplicantId"], obj["RequirementId"], obj["CommentText"], obj["IsChecked"]);
                            resultMessage = "Навык успешно добавлен";
                            success = true;
                        }
                    else if (objArray is Dictionary<string, object>)
                    {
                        ApplicantRequirementsManager.Create(objArray["ApplicantId"], objArray["RequirementId"], objArray["CommentText"], objArray["IsChecked"]);
                        resultMessage = "Навык успешно добавлен";
                        success = true;
                    }
                    else
                        resultMessage = "Неверный тип данных запроса";
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


        [HttpPost]
        public ActionResult Update()
        {
            bool success = false;
            string resultMessage = "Ошибка при изменении навыка";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            StreamReader reader = new StreamReader(HttpContext.Request.InputStream);
            string data = reader.ReadToEnd();

            try
            {
                if (data != null)
                {
                    var objArray = jss.Deserialize<dynamic>(data);

                    // Проверка на тип данных нужна из-за формата приходящих данных.
                    // Если у нас в списке "Требования" один элемент,
                    // то после десериализации переменная objArray имеет тип Dictionary<string, object>,
                    // когда больше одного элемента, то - object[].
                    if (objArray is object[])
                        foreach (var obj in objArray)
                        {
                            //var obj = jss.Deserialize<dynamic>(o);
                            ApplicantRequirementsManager.Update(obj["Id"], obj["CommentText"], obj["IsChecked"]);
                            resultMessage = "Навык успешно добавлен";
                            success = true;
                        }
                    else if (objArray is Dictionary<string, object>)
                    {
                        ApplicantRequirementsManager.Update(objArray["Id"], objArray["CommentText"], objArray["IsChecked"]);
                        resultMessage = "Навык успешно изменен";
                        success = true;
                    }
                    else
                        resultMessage = "Неверный тип данных запроса";
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
