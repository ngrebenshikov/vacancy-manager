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
            return _db.Resumes.Where(v => v.ApplicantID == appId).ToList();
        }

        internal static Resume GetResume(int? resId)
        {
            VacancyContext _db = new VacancyContext();
            return _db.Resumes.Where(v => v.ResumeId == resId).Single();
        }

        internal static void DeleteResume(int id)
        {
            VacancyContext _db = new VacancyContext();
            var obj = _db.Resumes.Where(res => res.ResumeId == id).FirstOrDefault();

            _db.Resumes.Remove(obj);
            _db.SaveChanges();
        }

        internal static Resume UpdateResume(int resId, string position, string summary, string training, string addInfo)
        {
            VacancyContext _db = new VacancyContext();
            Resume upRes = _db.Resumes.Where(res => res.ResumeId == resId).FirstOrDefault();
            if (upRes != null)
            {
                upRes.Position = position;
                upRes.Summary = summary;
                upRes.Training = training;
                upRes.AdditionalInformation = addInfo;
                _db.SaveChanges();
            }
            return upRes;
        }

        internal static List<Resume> CreateResume(int applicantId, string Position, string Summary, string Training, DateTime Date, string addInfo)
        {
            VacancyContext _db = new VacancyContext();
            var obj = new List<Resume>();
            obj.Add(new Resume
            {
                ApplicantID = applicantId,
                Position = Position,
                Summary = Summary,
                Training = Training,
                AdditionalInformation = addInfo,
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

        internal static ResumeRequirement UpdateResumeRequirement(int Id, string comment, bool isChecked)
        {
            VacancyContext _db = new VacancyContext();

            ResumeRequirement updateRec = _db.ResumeRequirements.Where(v => v.Id == Id).Single();

            updateRec.Comment = comment;
            updateRec.IsChecked = isChecked;
            _db.SaveChanges();
            return updateRec;
        }

        internal static IEnumerable<ResumeRequirement> GetResumeRequirements(int resumeId)
        {
            VacancyContext _db = new VacancyContext();
            return _db.ResumeRequirements.Where(v => v.ResumeId == resumeId).ToList();
        }

        #endregion

        #region Experience

        internal static IEnumerable<Experience> GetResumeExperience(int resumeId)
        {
            VacancyContext _db = new VacancyContext();
            return _db.PreviousExperiences.Where(v => v.ResumeId == resumeId).ToList();
        }

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

        internal static Experience UpdateResumeExperience(int experienceId, string duties, DateTime? finishDate, bool isEdu, string job, string position, string project, DateTime startDate)
        {
            VacancyContext _db = new VacancyContext();
            Experience updateRec = _db.PreviousExperiences.Where(x => x.ExperienceId == experienceId).Single();
          
            if (updateRec != null)
            {
                updateRec.Duties = duties;
                updateRec.FinishDate = finishDate;
                updateRec.IsEducation = isEdu;
                updateRec.Job = job;
                updateRec.Position = position;
                updateRec.Project = project;
                updateRec.StartDate = startDate;


                _db.SaveChanges();
            }

            return updateRec;
        }

        #endregion

        #region  ExperienceRequirements


        internal static IEnumerable<ExperienceRequirement> GetExperienceRequirements(int experienceId)
        {
            VacancyContext _db = new VacancyContext();
            return _db.ExperienceRequirements.Where(v => v.ExperienceId == experienceId).ToList();
        }

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


        internal static ExperienceRequirement UpdateExperienceRequirement(int Id, string comment, bool isChecked)
        {
            VacancyContext _db = new VacancyContext();

            ExperienceRequirement updateRec = _db.ExperienceRequirements.Where(v => v.Id == Id).Single();

            updateRec.Comment = comment;
            updateRec.IsChecked = isChecked;
            _db.SaveChanges();
            return updateRec;
        }
        #endregion
    }
}