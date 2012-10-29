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
            IEnumerable<ApplicantRequirement> obj = null;

            if (id > 0)
            {
                obj = _db.ApplicantRequirements.Where(rec => rec.ApplicantId == id).ToList();
                return obj;
            }
            else
                return null;
        }

        internal static void Create(int appId, int reqId, string comment)
        {
            _db.ApplicantRequirements.Add(new ApplicantRequirement{
                ApplicantId = appId,
                RequirementId = reqId,
                Comment = comment
            });

            _db.SaveChanges();
        }
    }
}