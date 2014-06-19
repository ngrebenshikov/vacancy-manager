using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VacancyManager.Models;
using VacancyManager.Services.Managers;

namespace VacancyManager.Models.JSON
{
    public class JsonResumeExperience
    {
        public int ExperienceId { get; set; }
        public string Job { get; set; }
        public string Project { get; set; }
        public string Position { get; set; }
        public int ResumeId { get; set; }
        public string StartDate { get; set; }
        public string FinishDate { get; set; }
        public string Duties { get; set; }
        public bool IsEducation { get; set; }

        public Tuple<string, bool> AddToResumeExperienceStore()
        {
            Tuple<string, bool> CreationStatus = new Tuple<string, bool>("Информация об опыте успешно добавлена", true);
            Experience NewResumeExperience = ResumeManager.CreateResumeExperience(this);
            ExperienceId = NewResumeExperience.ExperienceId;
            return CreationStatus;
        }

        public Tuple<string, bool> UpdateInResumeExperienceStore()
        {
            Tuple<string, bool> UpdateStatus = new Tuple<string, bool>("Информация об опыте успешно обновлена", true);
            ResumeManager.UpdateResumeExperience(this);
            return UpdateStatus;
        }

        public Tuple<string, bool> DeleteFromResumeExperienceStore()
        {
            Tuple<string, bool> DeleteStatus = new Tuple<string, bool>("Информация об опыте успешно удалена", true);
            ResumeManager.DeleteResumeExperience(ExperienceId);
            return DeleteStatus;
        }
    }
}