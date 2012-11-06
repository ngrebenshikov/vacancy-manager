﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{
    internal static class ApplicantRequirementsManager
    {
        static VacancyContext _db = new VacancyContext();

        internal static IEnumerable<ApplicantRequirement> GetListByApplicantId(int id)
        {
            IEnumerable<ApplicantRequirement> obj = null;

            obj = _db.ApplicantRequirements.Where(rec => rec.ApplicantId == id).ToList();
            return obj;
        }

        internal static void Create(int appId, int reqId, string comment, bool isChecked)
        {
            _db.ApplicantRequirements.Add(new ApplicantRequirement{
                ApplicantId = appId,
                RequirementId = reqId,
                Comment = comment,
                IsChecked = isChecked
            });

            _db.SaveChanges();
        }

        internal static void Update(int id, string comment, bool isChecked)
        {
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
            var obj = _db.ApplicantRequirements.Where(app => app.Id == id).FirstOrDefault();

            _db.ApplicantRequirements.Remove(obj);
            _db.SaveChanges();
        }
    }
}