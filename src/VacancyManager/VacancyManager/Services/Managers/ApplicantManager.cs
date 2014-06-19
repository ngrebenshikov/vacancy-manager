using System;
using System.Collections.Generic;
using System.Linq;
using VacancyManager.Models;
using VacancyManager.Models.JSON;
using System.Web.Security;

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

    internal static int Create(JsonApplicant NewApplicant)
    {
      VacancyContext _db = new VacancyContext();
      Applicant obj = new Applicant
      {
          FullName = NewApplicant.FullName,
          FullNameEn = NewApplicant.FullNameEn,
          ContactPhone = NewApplicant.ContactPhone,
          Email = NewApplicant.Email,
          Employed = NewApplicant.Employed
      };
      _db.Applicants.Add(obj);
      _db.SaveChanges();

      return obj.ApplicantID;
    }

    internal static Applicant Create(string fullName, string fullNameEn, string contactPhone, string email, bool employed)
    {
        VacancyContext _db = new VacancyContext();
        Applicant obj = new Applicant
        {
            FullName = fullName,
            FullNameEn = fullNameEn,
            ContactPhone = contactPhone,
            Email = email,
            Employed = employed
        };
        _db.Applicants.Add(obj);
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

    internal static Applicant Update(JsonApplicant UpdatingApplicant)
    {
      VacancyContext _db = new VacancyContext();
      var obj = _db.Applicants.Where(app => app.ApplicantID == UpdatingApplicant.ApplicantID).FirstOrDefault();

      if (obj != null)
      {
        obj.FullName = UpdatingApplicant.FullName;
        obj.FullNameEn = UpdatingApplicant.FullNameEn;
        obj.ContactPhone = UpdatingApplicant.ContactPhone;
        obj.Email = UpdatingApplicant.Email;
        obj.Employed = UpdatingApplicant.Employed;
      }

      _db.SaveChanges();

      return obj;
    }

    internal static bool IsApplicantExists(string email)
    {
      VacancyContext _db = new VacancyContext();
      return _db.Applicants.Any(x => x.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
    }

    internal static Applicant GetApplicantByEMail(string Email)
    {
        Applicant app; 
        VacancyContext _db = new VacancyContext();
        app = _db.Applicants.Where(applicant => applicant.Email == Email).FirstOrDefault();
        return app;
    }

    private static Applicant GetOnlineApplicant(string UserName)
    {
        VMMembershipUser vmuser = (VMMembershipUser)Membership.GetUser(UserName);
        if (vmuser != null)
            return ApplicantManager.GetApplicantByEMail(vmuser.Email);
        else
            return null;
    }


    internal static bool ValidateApplicant(int ValidatingApplicantId, string UserName) 
      {
          int CurApplicantId = GetOnlineApplicant(UserName).ApplicantID;
          bool IsApplicantValid = false;
          if (CurApplicantId == ValidatingApplicantId)
              IsApplicantValid = true;
          return IsApplicantValid;
      }
  }
}