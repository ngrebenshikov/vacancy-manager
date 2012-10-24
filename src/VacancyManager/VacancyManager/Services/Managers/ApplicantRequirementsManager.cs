using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{
    internal static class ApplicantRequirementsManager
    {
        static VacancyContext _db = new VacancyContext();

        internal static IEnumerable<ApplicantRequirement> GetApplicantRequirements(int id)
        {
            dynamic obj;

            if (id > 0)
                obj = _db.ApplicantRequirements.Where(rec => rec.ApplicantId == id).ToList();
            else
                obj = _db.ApplicantRequirements.ToList();

            return obj;
        }
    }
}