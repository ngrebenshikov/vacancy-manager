using System;
using System.Collections.Generic;
using System.Linq;
using VacancyManager.Models;
using VacancyManager.Models.JSON;
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

        internal static Resume GetResumeByID(int resId)
        {
            VacancyContext _db = new VacancyContext();
            return _db.Resumes.Where(v => v.ResumeId == resId).FirstOrDefault();
        }

        internal static Resume GetResumeByExperienceID(int experienceId)
        {
            VacancyContext _db = new VacancyContext();
            return _db.PreviousExperiences.Where(v => v.ExperienceId == experienceId).FirstOrDefault().Resume;
        }

        internal static IEnumerable<Resume> GetResumes(int appId)
        {
            VacancyContext _db = new VacancyContext();
            return _db.Resumes.Where(v => v.ApplicantID == appId).ToList();
        }

        internal static Resume GetResume(int? resId)
        {
            VacancyContext _db = new VacancyContext();
            return _db.Resumes.Where(v => v.ResumeId == resId).FirstOrDefault();
        }

        internal static void DeleteResume(int id)
        {
            VacancyContext _db = new VacancyContext();
            var obj = _db.Resumes.Where(res => res.ResumeId == id).FirstOrDefault();

            _db.Resumes.Remove(obj);
            _db.SaveChanges();
        }

        internal static Resume UpdateResume(JsonResume UpdatingResume)
        {
            VacancyContext _db = new VacancyContext();
            Resume UpRes = _db.Resumes.Where(res => res.ResumeId == UpdatingResume.ResumeId).FirstOrDefault();
            if (UpRes != null)
            {
                UpRes.Position = UpdatingResume.Position;
                UpRes.Summary = UpdatingResume.Summary;
                UpRes.Training = UpdatingResume.Training;
                UpRes.StatusID = UpdatingResume.StatusID;
                UpRes.LanquageID = UpdatingResume.LanquageID;
                UpRes.AdditionalInformation = UpdatingResume.AdditionalInformation;
                _db.SaveChanges();
            }
            return UpRes;
        }

        internal static Resume CreateResume(JsonResume CreatingResume)
        {
            VacancyContext _db = new VacancyContext();
            Resume obj = new Resume
            {
                ApplicantID = CreatingResume.ApplicantID,
                Position = CreatingResume.Position,
                Summary = CreatingResume.Summary,
                Training = CreatingResume.Training,
                AdditionalInformation = CreatingResume.AdditionalInformation,
                LanquageID = CreatingResume.LanquageID,
                Date = Convert.ToDateTime(CreatingResume.Date)
            };
            _db.Resumes.Add(obj);
            _db.SaveChanges();

            return obj;
        }

        internal static Resume CreateResumeCopy(Resume CreatingResume)
        {
            VacancyContext _db = new VacancyContext();
            Resume obj = new Resume
            {
                ApplicantID = CreatingResume.ApplicantID,
                Position = CreatingResume.Position,
                Summary = CreatingResume.Summary,
                Training = CreatingResume.Training,
                AdditionalInformation = CreatingResume.AdditionalInformation,
                LanquageID = CreatingResume.LanquageID,
                Date = DateTime.Now
            };
            _db.Resumes.Add(obj);
            _db.SaveChanges();

            return obj;
        }

        internal static bool ValidateResumePermissions(JsonResume EditingResume, string ActiveUser) 
        {
            bool Successfully = ApplicantManager.ValidateApplicant(EditingResume.ApplicantID, ActiveUser);        
            Resume ApplicantResume = new Resume();
            if (Successfully)
            {
                Successfully = false;
                ApplicantResume = GetResumeByID(EditingResume.ResumeId);
                if (ApplicantResume.StatusID != 2) { Successfully = true; }
            }
            return Successfully;
        }

        internal static bool ValidateResumePermissions(int resumeId, string ActiveUser)
        {
            Resume ApplicantResume = GetResumeByID(resumeId);
            bool Successfully = ApplicantManager.ValidateApplicant(ApplicantResume.ApplicantID, ActiveUser);
            if (Successfully)
            {
                Successfully = false;            
                if (ApplicantResume.StatusID != 2) { Successfully = true; }
            }
            return Successfully;
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

            ResumeRequirement updateRec = _db.ResumeRequirements.Where(v => v.Id == Id).SingleOrDefault();

            if (updateRec != null)
            {
                if (updateRec.Resume.StatusID != 2)
                {
                    updateRec.Comment = comment;
                    updateRec.IsChecked = isChecked;
                    _db.SaveChanges();
                }
            }

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

        internal static Experience CreateResumeExperience(JsonResumeExperience NewResumeExperience)
        {
            VacancyContext _db = new VacancyContext();
            DateTime? finishDate = null;
            if ((NewResumeExperience.FinishDate != "") && (NewResumeExperience.FinishDate != null)) finishDate = Convert.ToDateTime(NewResumeExperience.FinishDate);
            Experience Experience = new Experience
                      {
                          ResumeId = NewResumeExperience.ResumeId,
                          Duties = NewResumeExperience.Duties,
                          FinishDate = finishDate,
                          IsEducation = NewResumeExperience.IsEducation,
                          Job = NewResumeExperience.Job,
                          Position = NewResumeExperience.Position,
                          Project = NewResumeExperience.Project,
                          StartDate = Convert.ToDateTime(NewResumeExperience.StartDate)
                      };

            _db.PreviousExperiences.Add(Experience);
            _db.SaveChanges();
            return Experience;
        }

        internal static Experience CreateResumeExperience(Experience NewResumeExperience)
        {
            VacancyContext _db = new VacancyContext();
            DateTime? finishDate = null;
            if (NewResumeExperience.FinishDate != null) finishDate = Convert.ToDateTime(NewResumeExperience.FinishDate);
            Experience Experience = new Experience
            {
                ResumeId = NewResumeExperience.ResumeId,
                Duties = NewResumeExperience.Duties,
                FinishDate = finishDate,
                IsEducation = NewResumeExperience.IsEducation,
                Job = NewResumeExperience.Job,
                Position = NewResumeExperience.Position,
                Project = NewResumeExperience.Project,
                StartDate = Convert.ToDateTime(NewResumeExperience.StartDate)
            };

            _db.PreviousExperiences.Add(Experience);
            _db.SaveChanges();
            return Experience;
        }

        internal static Experience UpdateResumeExperience(JsonResumeExperience UpdatingResumeExperience)
        {
            VacancyContext _db = new VacancyContext();
            Experience updateRec = _db.PreviousExperiences.Where(x => x.ExperienceId == UpdatingResumeExperience.ExperienceId).SingleOrDefault();
            DateTime? finishDate = null;
            if ((UpdatingResumeExperience.FinishDate != "") && (UpdatingResumeExperience.FinishDate != null)) finishDate = Convert.ToDateTime(UpdatingResumeExperience.FinishDate);
  
            if (updateRec != null)
            {
                updateRec.Duties = UpdatingResumeExperience.Duties;
                updateRec.FinishDate = finishDate;
                updateRec.IsEducation = UpdatingResumeExperience.IsEducation;
                updateRec.Job = UpdatingResumeExperience.Job;
                updateRec.Position = UpdatingResumeExperience.Position;
                updateRec.Project = UpdatingResumeExperience.Project;
                updateRec.StartDate = Convert.ToDateTime(UpdatingResumeExperience.StartDate);
                _db.SaveChanges();
            }

            return updateRec;
        }

        internal static void DeleteResumeExperience(int id)
        {
            VacancyContext _db = new VacancyContext();
            var obj = _db.PreviousExperiences.Where(res => res.ExperienceId== id).FirstOrDefault();

            _db.PreviousExperiences.Remove(obj);
            _db.SaveChanges();
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