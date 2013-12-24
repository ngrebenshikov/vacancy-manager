using System;
using System.Linq;
using System.Web.Mvc;
using VacancyManager.Models;
using VacancyManager.Services.Managers;
using System.Web.Script.Serialization;
using VacancyManager.Services;
using System.Web.Security;
using System.IO;
using System.Collections.Generic;
using System.Globalization;

namespace VacancyManager.Controllers
{
  [AuthorizeError(Roles = "Admin")]  
    
  public class ResumeController : BaseController
  {
      [HttpGet]
      public ActionResult LoadResume (int appId)
      { 
              var Resume = ResumeManager.GetResumes(appId);
              var ResumeList = (from res in Resume
                                select new
                                {
                                    ResumeId = res.ResumeId,
                                    Date = res.Date.ToShortDateString(),
                                    Training = res.Training,
                                    StartDate = res.Period,
                                    Position = res.Position,
                                    Summary = res.Summary
                                    }).ToList();
              
              return Json(new
              {
                  success = true,
                  data = ResumeList
              }, JsonRequestBehavior.AllowGet);
      }

      [HttpPost]
      public ActionResult DeleteResume(string data) //(int id)
      {
          bool success = false;
          string resultMessage = "Ошибка при удалении резюме";
          JavaScriptSerializer jss = new JavaScriptSerializer();
          if (data != null)    //(id != null)
          {
              var obj = jss.Deserialize<dynamic>(data); //
              ResumeManager.DeleteResume(obj["ResumeId"]);  //ResumeManager.DeleteResume(id);
              resultMessage = "Резюме Удалено";
              success = true;
          }

          return Json(new
          {
              success = success,
              message = resultMessage
          });
      }

      [HttpPost]
      public ActionResult CreateResume(string data)
      {
          bool success = false;
          string resultMessage = "Ошибка при добавлении резюме";
          JavaScriptSerializer jss = new JavaScriptSerializer();
          List<Resume> created = new List<Resume>();

          if (data != null)
          {
              var obj = jss.Deserialize<dynamic>(data);
              CultureInfo culture = new CultureInfo("hu");
              created = ResumeManager.CreateResume(obj["Position"].ToString(), obj["Summary"].ToString(), obj["Training"].ToString(), Convert.ToDateTime(obj["Date"], culture));
                
              resultMessage = "Резюме добавлено";
              success = true;
          }
          else
              created = null;

          return Json(new
          {
              success = success,
              data = created,
              message = resultMessage
          });
      
      }
   

  }
}
