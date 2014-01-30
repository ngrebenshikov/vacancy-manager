using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Models;
using VacancyManager.Services.Managers;

namespace VacancyManager.Controllers
{
    public class ExperienceController : BaseController
    {
        [HttpGet]
        public ActionResult LoadExperience(int ResId)
        {
            var Experience = ResumeManager.GetExperience(ResId);
            var ExperienceList = (from exp in Experience
                                  select new
                                  {
                                      ExperienceId = exp.ExperienceId,
                                      job = exp.Job,
                                      Project = exp.Project,
                                      Position = exp.Position,
                                      ResumeId = exp.ResumeId,
                                      StartDate = exp.StartDate.ToShortDateString(),
                                      FinishDate = exp.FinishDate.Value.ToShortDateString(),
                                      Duties = exp.Duties,
                                      IsEducation = exp.IsEducation
                                  }).ToList();

            return Json(new
            {
                success = true,
                data = ExperienceList
            }, JsonRequestBehavior.AllowGet);
        }

    }
}
