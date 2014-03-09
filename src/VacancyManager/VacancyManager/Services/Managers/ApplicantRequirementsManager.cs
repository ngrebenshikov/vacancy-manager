using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{
    internal static class ApplicantRequirementsManager
    {
        internal static IEnumerable<ApplicantRequirement> GetListByApplicantId(int id)
        {
            VacancyContext _db = new VacancyContext();
            IEnumerable<ApplicantRequirement> obj = null;

            obj = _db.ApplicantRequirements.Where(rec => rec.ApplicantId == id).ToList();
            return obj;
        }

        internal static ApplicantRequirement Create(int appId, int reqId, string comment, bool isChecked)
        {
            VacancyContext _db = new VacancyContext();

            ApplicantRequirement obj = new ApplicantRequirement{
                ApplicantId = appId,
                RequirementId = reqId,
                Comment = comment,
                IsChecked = isChecked
            };

            _db.ApplicantRequirements.Add(obj);

            _db.SaveChanges();
            return obj;
        }

        internal static void Update(int id, string comment, bool isChecked)
        {
            VacancyContext _db = new VacancyContext();
            var obj = _db.ApplicantRequirements.Where(app => app.Id == id).FirstOrDefault();

            if (obj != null && (obj.Comment != comment || obj.IsChecked != isChecked))
            {
                obj.Comment = comment;
                obj.IsChecked = isChecked;

                _db.SaveChanges();
            }
        }

        internal static void Delete(int id)
        {
            VacancyContext _db = new VacancyContext();
            var obj = _db.ApplicantRequirements.Where(app => app.Id == id).FirstOrDefault();

            _db.ApplicantRequirements.Remove(obj);
            _db.SaveChanges();
        }
    }
}