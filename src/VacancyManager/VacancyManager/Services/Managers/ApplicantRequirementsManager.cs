using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VacancyManager.Models;
using VacancyManager.Models.JSON;

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

        internal static ApplicantRequirement Create(JsonApplicantRequirement applicantRequirement)
        {
            VacancyContext _db = new VacancyContext();

            ApplicantRequirement obj = new ApplicantRequirement{
                ApplicantId = applicantRequirement.ApplicantId,
                RequirementId = applicantRequirement.RequirementID,
                Comment = applicantRequirement.Comments,
                IsChecked = applicantRequirement.IsChecked
            };

            _db.ApplicantRequirements.Add(obj);
            _db.SaveChanges();
            return obj;
        }

        internal static void Update(JsonApplicantRequirement applicantRequirement)
        {
            VacancyContext _db = new VacancyContext();
            var obj = _db.ApplicantRequirements.Where(app => app.Id == applicantRequirement.Id).SingleOrDefault();

            if (obj != null)
            {
                obj.Comment = applicantRequirement.Comments;
                obj.IsChecked = applicantRequirement.IsChecked;

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