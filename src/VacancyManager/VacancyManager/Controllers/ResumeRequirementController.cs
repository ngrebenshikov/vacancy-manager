﻿using System;
using System.Linq;
using System.Web.Mvc;
using VacancyManager.Models;
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

            bool CanChangeOrViewData = UserCanExecuteAction;
            if (!CanChangeOrViewData)
            {
                CanChangeOrViewData = ApplicantManager.IsValidApplicant(ViewResume.ApplicantID, User.Identity.Name);
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
                ResumeRequirements = Complex.ToList(),
                total = Complex.ToList().Count,
                success = true
            }, JsonRequestBehavior.AllowGet
            );
        }


        [HttpPost]
        public ActionResult Create(string[] data)
        {
            bool CreateSuccess = false,
                 CanChangeOrViewData = UserCanExecuteAction;
            string CreateMessage = "При изменении требований произошла ошибка";
            List<object> CreatedReqs = new List<object>();
            ResumeRequirement CreatedResumeReq = new ResumeRequirement();
            if (data != null)
            {
                for (int i = 0; i <= data.Length - 1; i++)
                {
                    String Comments = "";
                    var u_resumerequirement = jss.Deserialize<dynamic>(data[i]);
                    Int32 Id = Convert.ToInt32(u_resumerequirement["Id"]);
                    Int32 ResumeID = Convert.ToInt32(u_resumerequirement["ResumeId"]);
                    Int32 RequirementID = Convert.ToInt32(u_resumerequirement["RequirementID"]);
                    Boolean IsRequire = Convert.ToBoolean(u_resumerequirement["IsRequire"]);
                    Resume editingResume = ResumeManager.GetResumeByID(ResumeID);

                    if (IsRequire) { Comments = u_resumerequirement["Comments"].ToString(); }
                    if (!CanChangeOrViewData)
                    {
                        CanChangeOrViewData = ApplicantManager.IsValidApplicant(editingResume.ApplicantID, User.Identity.Name);
                    }

                    if (CanChangeOrViewData)
                    {
                        CreatedResumeReq = ResumeManager.CreateResumeRequirement(ResumeID, RequirementID, Comments, IsRequire);

                        CreatedReqs.Add(new
                        {
                            Id = CreatedResumeReq.Id,
                            StackName = u_resumerequirement["StackName"],
                            ResumeId = u_resumerequirement["ResumeId"],
                            RequirementStackID = u_resumerequirement["RequirementStackID"],
                            RequirementID = u_resumerequirement["RequirementID"],
                            RequirementName = u_resumerequirement["RequirementName"],
                            Comments = u_resumerequirement["Comments"],
                            IsRequire = u_resumerequirement["IsRequire"],
                        });

                        CreateSuccess = true;
                        CreateMessage = "Требования успешно созданы";
                    }
                }
            }

            return Json(new
            {
                success = CreateSuccess,
                ResumeRequirements = CreatedReqs,
                message = CreateMessage
            });

        }

        [HttpPost]
        public ActionResult Update(string[] data)
        {
            bool UpdateSuccess = false,
                 CanChangeOrViewData = UserCanExecuteAction;
            string UpdateMessage = "При изменении требований произошла ошибка";
            List<object> CreatedReqs = new List<object>();
            ResumeRequirement CreatedResumeReq = new ResumeRequirement();

            if (data != null)
            {
                for (int i = 0; i <= data.Length - 1; i++)
                {
                    String Comments = "";
                    var u_resumerequirement = jss.Deserialize<dynamic>(data[i]);
                    Int32 Id = Convert.ToInt32(u_resumerequirement["Id"]),
                          ResumeID = Convert.ToInt32(u_resumerequirement["ResumeId"]),
                          RequirementID = Convert.ToInt32(u_resumerequirement["RequirementID"]);
                    Boolean IsRequire = Convert.ToBoolean(u_resumerequirement["IsRequire"]);
                    Resume editingResume = ResumeManager.GetResumeByID(ResumeID);
                    if (IsRequire)
                    {
                        Comments = u_resumerequirement["Comments"].ToString();
                    }
                    if (!CanChangeOrViewData)
                    {
                        CanChangeOrViewData = ApplicantManager.IsValidApplicant(editingResume.ApplicantID, User.Identity.Name);
                    }

                    if (CanChangeOrViewData)
                    {

                        if (Id != 0) { CreatedResumeReq =  ResumeManager.UpdateResumeRequirement(Id, Comments, IsRequire); }
                        else {CreatedResumeReq = ResumeManager.CreateResumeRequirement(ResumeID, RequirementID, Comments, IsRequire); }

                        CreatedReqs.Add(new
                        {
                            Id = CreatedResumeReq.Id,
                            StackName = u_resumerequirement["StackName"],
                            ResumeId = u_resumerequirement["ResumeId"],
                            RequirementStackID = u_resumerequirement["RequirementStackID"],
                            RequirementID = u_resumerequirement["RequirementID"],
                            RequirementName = u_resumerequirement["RequirementName"],
                            Comments = u_resumerequirement["Comments"],
                            IsRequire = u_resumerequirement["IsRequire"],
                        });

                        UpdateSuccess = true;
                        UpdateMessage = "Требования успешно изменены";
                    }

                }

            }
            return Json(new
            {
                success = UpdateSuccess,
                ResumeRequirements = CreatedReqs,
                message = UpdateMessage
            });
        }

    }
}