using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VacancyManager.Services.Managers;

namespace VacancyManager.Models.JSON
{
    public class JsonResume
    {
        public int ResumeId { get; set; }
        public int ApplicantID { get; set; }
        public string Date { get; set; }
        public string Training { get; set; }
        public string AdditionalInformation { get; set; }
        public int LanquageID { get; set; }
        public int StatusID { get; set; }
        public string StartDate { get; set; }
        public string Position { get; set; }
        public string Summary { get; set; }

        public Tuple<string, bool> AddToResumeStore()
        {
            Date = DateTime.Now.ToShortDateString(); 
            Resume CreatedResume = ResumeManager.CreateResume(this);
            ResumeId = CreatedResume.ResumeId;
            StartDate = CreatedResume.Period;
            Tuple<string, bool> CreationStatus = new Tuple<string, bool>("Резюме успешно создано", true);
            return CreationStatus;
        }

        public Tuple<string, bool> UpdateInResumeStore()
        {
            ResumeManager.UpdateResume(this);
            Tuple<string, bool> UpdateStatus = new Tuple<string, bool>("Резюме успешно обновлено", true);
            return UpdateStatus;
        }

        public Tuple<string, bool> DeleteFromResumeStore()
        {
            ResumeManager.DeleteResume(ResumeId);
            Tuple<string, bool> DeleteStatus = new Tuple<string, bool>("Резюме успешно удалено", true);
            return DeleteStatus;
        }

    }
}