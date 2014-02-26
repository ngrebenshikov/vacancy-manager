using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{  
    
    public class ExperienceManager
    {
        static VacancyContext _db = new VacancyContext();

        internal static IEnumerable<Experience> GetList(int id)
        {
            var obj = _db.PreviousExperiences.Where(attach => attach.Resume.ResumeId == id).ToList();
            return obj;
        }

    }
}