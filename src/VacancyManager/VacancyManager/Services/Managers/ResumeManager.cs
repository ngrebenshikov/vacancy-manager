using System;
using System.Collections.Generic;
using System.Linq;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{
    internal static class ResumeManager
    {
        #region Resume
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

        internal static Resume GetResume(int? resId)
        {
            VacancyContext _db = new VacancyContext();
            return _db.Resumes.Where(v => v.ResumeId == resId).Single();
        }

        internal static IEnumerable<Experience> GetExperience(int ResId)
        {
            VacancyContext _db = new VacancyContext();
            return _db.PreviousExperiences.Where(Exp => Exp.Resume.ResumeId == ResId).ToList();
        }


        internal static void DeleteResume(int id)
        {
            VacancyContext _db = new VacancyContext();
            var obj = _db.Resumes.Where(res => res.ResumeId == id).FirstOrDefault();

            _db.Resumes.Remove(obj);
            _db.SaveChanges();
        }

        internal static List<Resume> CreateResume(int applicantId, string Position, string Summary, string Training, DateTime Date)
        {
            VacancyContext _db = new VacancyContext();
            var obj = new List<Resume>();
            obj.Add(new Resume
            {   ApplicantID = applicantId,
                Position = Position,
                Summary = Summary,
                Training = Training,
                Date = Date
            });
            _db.Resumes.Add(obj[0]);
            _db.SaveChanges();

            return obj;
        }
        #endregion

        #region ResumeRequirement
        internal static ResumeRequirement CreateResumeRequirement(int resumeId, int reqId, string comment, bool isChecked)
        {
            VacancyContext _db = new VacancyContext();
            var ResumeRequirement =
                      new ResumeRequirement
                      {
                          ResumeId = resumeId,
                          RequirementId = reqId,
                          Comment = comment,
                          IsChecked = isChecked
                      };

            _db.ResumeRequirements.Add(ResumeRequirement);
            _db.SaveChanges();
            return ResumeRequirement;
        }

        #endregion

        #region Experience
        internal static Experience CreateResumeExperience(int resumeId, string duties, DateTime? finishDate, bool isEdu, string job, string position, string project, DateTime startDate)
        {
            VacancyContext _db = new VacancyContext();
            var ResumeExperience =
                      new Experience
                      {
                        ResumeId = resumeId,
                        Duties = duties,
                        FinishDate = finishDate,
                        IsEducation = isEdu,
                        Job = job,
                        Position = position,
                        Project = project,
                        StartDate = startDate
                     };

            _db.PreviousExperiences.Add(ResumeExperience);
            _db.SaveChanges();
            return ResumeExperience;
        }
        #endregion

        #region  ExperienceRequirements
        internal static ExperienceRequirement CreateExperienceRequirement(int experienceId, int reqId, string comment, bool isChecked)
        {
            VacancyContext _db = new VacancyContext();
            var ExperienceRequirement =
                      new ExperienceRequirement
                      {
                          ExperienceId = experienceId,
                          RequirementId = reqId,
                          Comment = comment,
                          IsChecked = isChecked                      
                      };

            _db.ExperienceRequirements.Add(ExperienceRequirement);
            _db.SaveChanges();
            return ExperienceRequirement;
        }
        #endregion
    }
}