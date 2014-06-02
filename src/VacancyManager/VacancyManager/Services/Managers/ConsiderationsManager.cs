using System;
using System.Collections.Generic;
using VacancyManager.Models;
using System.Linq;
using System.Web;

namespace VacancyManager.Services.Managers
{

    internal static class ConsiderationsManager
    {
        private static string[] DefaultStatuses = { "Новая", "Отклонена", "На рассмотрении", "Одобрена" };

        #region Consideration

        internal static bool IsApplicantConsiderationExist(int AppId, int VacId)
        {
            VacancyContext _db = new VacancyContext();
            bool ConsExist = false;
            List<Consideration> Cons = _db.Considerations.Where(v => v.ApplicantID == AppId && v.VacancyID == VacId).ToList();
            if (Cons.Count > 0)
            {
                ConsExist = true;
            }
            return ConsExist;
        }

        internal static Consideration GetConsideration(int considerationId)
        {
            VacancyContext _db = new VacancyContext();
            return _db.Considerations.Where(v => v.ConsiderationID == considerationId).FirstOrDefault();
        }

        internal static IEnumerable<Consideration> GetConsiderations()
        {
            VacancyContext _db = new VacancyContext();
            return _db.Considerations.ToList();
        }
        internal static IEnumerable<Consideration> GetConsiderationsByIds(int[] ConsIds)
        {
            VacancyContext _db = new VacancyContext();
            return _db.Considerations.Where(x => ConsIds.Contains(x.ConsiderationID));
        }
        internal static IEnumerable<Consideration> GetConsiderations(int vacancyId)
        {
            VacancyContext _db = new VacancyContext();
            return _db.Considerations.Where(v => v.VacancyID == vacancyId).ToList();
        }

        internal static IEnumerable<Consideration> GetApplicantConsiderations(int ApplicantId)
        {
            VacancyContext _db = new VacancyContext();
            return _db.Considerations.Where(v => v.ApplicantID == ApplicantId).ToList();
        }

        internal static IEnumerable<Consideration> GetAppConsiderations(int AppId)
        {
            VacancyContext _db = new VacancyContext();
            return _db.Considerations.Where(v => v.ApplicantID == AppId).ToList();
        }

        internal static Consideration CreateConsideration(int vacancyId, int applicantId)
        {
            VacancyContext _db = new VacancyContext();

            Consideration NewConsideration = new Consideration
                                {
                                    VacancyID = vacancyId,
                                    ApplicantID = applicantId,
                                    ConsiderationStatusID = _db.ConsiderationStatuses.FirstOrDefault().ConsiderationStatusID
                                };

            _db.Considerations.Add(NewConsideration);
            _db.SaveChanges();
            return NewConsideration;
        }

        internal static Consideration UpdateConsideration(int considerationId, int considerationstatusId)
        {
            VacancyContext _db = new VacancyContext();
            Consideration cons = _db.Considerations.Where(x => x.ConsiderationID == considerationId).FirstOrDefault();
            cons.ConsiderationStatusID = considerationstatusId;          
            _db.SaveChanges();
            return cons;
        }

        internal static void DeleteConsideration(int considerationId)
        {
            VacancyContext _db = new VacancyContext();
            var delete_rec = _db.Considerations.SingleOrDefault(a => a.ConsiderationID == considerationId);

            if (delete_rec == null) return;

            _db.Considerations.Remove(delete_rec);
            _db.SaveChanges();
        }

        #endregion

        #region ConsiderationStatus

        internal static IEnumerable<ConsiderationStatus> GetConsiderationStatuses()
        {
            VacancyContext _db = new VacancyContext();
            return _db.ConsiderationStatuses.ToList();
        }

        internal static bool IsConsiderationStatusExist(string considerationStatus)
        {
            VacancyContext _db = new VacancyContext();
            ConsiderationStatus status;
            status = _db.ConsiderationStatuses.Where(x => x.Status == considerationStatus).FirstOrDefault();
            return (status != null ? true : false);

        }

        internal static void CreateDefaultConsiderationStatuses()
        {
             foreach (string status in DefaultStatuses) 
             {
                 if (!IsConsiderationStatusExist(status)) {
                     CreateConsiderationStatus(status);
                 }
             }
        }

        internal static void CreateConsiderationStatus(string status)
        {
            VacancyContext _db = new VacancyContext();
            ConsiderationStatus newStatus = new ConsiderationStatus()
            {
                Status = status
            };

            _db.ConsiderationStatuses.Add(newStatus);
            _db.SaveChanges();

        }

        #endregion

        internal static bool IsConsiderationExists(int considerationId)
        {
            VacancyContext _db = new VacancyContext();
            return _db.Considerations.Any(x => x.ConsiderationID == considerationId);
        }
    }
}