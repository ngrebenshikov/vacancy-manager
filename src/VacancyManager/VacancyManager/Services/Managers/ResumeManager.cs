using System;
using System.Collections.Generic;
using System.Linq;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{
  internal static class ResumeManager
  {
    
    internal static IEnumerable<Resume> GetList()
    {
      VacancyContext _db = new VacancyContext();
      var obj = _db.Resumes.ToList();
      return obj;
    }

    internal static IEnumerable<Resume> GetResumes(int appId)
    {
        VacancyContext _db = new VacancyContext();
        return _db.Resumes.Where(v => v.Applicant.ApplicantID == appId).ToList(); 
    }

    internal static void DeleteResume(int id)
    {
        VacancyContext _db = new VacancyContext();
        var obj = _db.Resumes.Where(res => res.ResumeId == id).FirstOrDefault();

        _db.Resumes.Remove(obj);
        _db.SaveChanges();
    }
  
  }
}