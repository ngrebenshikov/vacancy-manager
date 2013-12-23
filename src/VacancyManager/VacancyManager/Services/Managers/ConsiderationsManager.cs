using System;
using System.Collections.Generic;
using VacancyManager.Models;
using System.Linq;
using System.Web;

namespace VacancyManager.Services.Managers
{
  internal static class ConsiderationsManager
  {
    #region Consideration

    internal static IEnumerable<Consideration> GetConsideration(int considerationId)
    {
      VacancyContext _db = new VacancyContext();
      return _db.Considerations.Where(v => v.ConsiderationID == considerationId).ToList();
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
                            ApplicantID = applicantId
                          };

      _db.Considerations.Add(NewConsideration);
      _db.SaveChanges();
      return NewConsideration;
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

    internal static bool IsConsiderationExists(int considerationId)
    {
      VacancyContext _db = new VacancyContext();
      return _db.Considerations.Any(x => x.ConsiderationID == considerationId);
    }
  }
}