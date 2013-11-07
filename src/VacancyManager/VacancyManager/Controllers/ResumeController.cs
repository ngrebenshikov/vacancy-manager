﻿using System;
using System.Linq;
using System.Web.Mvc;
using VacancyManager.Models;
using VacancyManager.Services.Managers;
using System.Web.Script.Serialization;
using VacancyManager.Services;
using System.Web.Security;
using System.IO;
using System.Collections.Generic;

namespace VacancyManager.Controllers
{
  [AuthorizeError(Roles = "Admin")]  
    
  public class ResumeController : BaseController
  {
      [HttpGet]
      public ActionResult LoadResume (Nullable<int> appId)
      {
          if (appId.HasValue)
          {
              var Resume = ResumeManager.GetResumes(appId.Value);
              var ResumeList = (from res in Resume
                                select new
                                {
                                    ResumeId = res.ResumeId,
                                    Date = res.Date.ToShortDateString(),
                                    //   Applicant = res.Applicant
                                }).ToList();
              return Json(new
              {
                  success = true,
                  data = ResumeList
              }, JsonRequestBehavior.AllowGet);
          }
          else
          {
              return Json(new
              {
                  success = true,
                  data = new List<Resume>()
              }, JsonRequestBehavior.AllowGet);
          }
      }
   

  }
}
