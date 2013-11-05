using System;
using System.Linq;
using System.Web.Mvc;
using VacancyManager.Models;
using VacancyManager.Services.Managers;
using System.Web.Script.Serialization;
using VacancyManager.Services;
using System.Web.Security;
using System.IO;

namespace VacancyManager.Controllers
{
  [AuthorizeError(Roles = "Admin")]  
    
  public class ResumeController : BaseController
  {
      [HttpGet]
      public ActionResult LoadResume (int appId)
      {
          var Resume = ResumeManager.GetList();
          var ResumeList = (from res in Resume
                             select new
                             {
                                 ResumeId = res.ResumeId,
                                 Date = res.Date,
                              //   Applicant = res.Applicant
                             }).ToList();
          return Json(new
          {
              success = true,
              data = ResumeList
          }, JsonRequestBehavior.AllowGet);
      }
   

  }
}
