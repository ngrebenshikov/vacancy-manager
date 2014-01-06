using System;
using System.Collections.Generic;
using System.Linq;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{
  internal static class ApplicantManager
  {
    //static VacancyContext _db = new VacancyContext();

    internal static IEnumerable<Applicant> GetList()
    {
      VacancyContext _db = new VacancyContext();
      var obj = _db.Applicants.ToList();
      return obj;
    }

    internal static List<Applicant> Create(string FullName, string FullNameEn, string contactPhone, string email, bool employed)
    {
      VacancyContext _db = new VacancyContext();
      var obj = new List<Applicant>();
      obj.Add(new Applicant
      {
        FullName = FullName,
        FullNameEn = FullNameEn,
        ContactPhone = contactPhone,
        Email = email,
        Employed = employed
      });

      _db.Applicants.Add(obj[0]);
      _db.SaveChanges();

      return obj;
    }

    internal static void Delete(int id)
    {
      VacancyContext _db = new VacancyContext();
      var obj = _db.Applicants.Where(app => app.ApplicantID == id).FirstOrDefault();

      _db.Applicants.Remove(obj);
      _db.SaveChanges();
    }

    internal static void Update(int id, string FullName, string contactPhone, string email, bool employed)
    {
      VacancyContext _db = new VacancyContext();
      var obj = _db.Applicants.Where(app => app.ApplicantID == id).FirstOrDefault();

      if (obj != null)
      {
        obj.FullName = FullName;
        obj.ContactPhone = contactPhone;
        obj.Email = email;
        obj.Employed = employed;
      }

      _db.SaveChanges();
    }

    internal static bool IsApplicantExists(string email)
    {
      VacancyContext _db = new VacancyContext();
      return _db.Applicants.Any(x => x.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
    }

    internal static Applicant GetApplicantByEMail(string Email)
    {
        Applicant app = new Applicant();
        VacancyContext _db = new VacancyContext();
        app = _db.Applicants.Where(applicant => applicant.Email == Email).FirstOrDefault();
        return app;
    }

  }
}