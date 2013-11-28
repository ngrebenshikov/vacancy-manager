using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    /// <summary>
    /// Класс, описывающий сущность резюме.
    /// </summary>
    public class Resume
    {
        public int ResumeId { get; set; }

        public string Position { get; set; }
        public string Summary { get; set; }

        public virtual ICollection<ResumeRequirement> ResumeRequirements { get; set; }
        public virtual ICollection<Experience> Experiences { get; set; }

        public DateTime Date { get; set; }
        public virtual Applicant Applicant { get; set; }

        public string Training { get; set; }
        public string AdditionalInformation { get; set; }

        public string Period {
            get
            {
                if (Experiences.Count <= 0) return null;
                DateTime? FinishDate = new DateTime ();
                DateTime StartDate = new DateTime (2200, 11, 12);
                foreach (var exp in Experiences)
                {
                    if (exp.StartDate.Year < StartDate.Year )
                    {
                        StartDate = exp.StartDate;
                    }
                    if (FinishDate != null && (exp.FinishDate == null || exp.FinishDate > FinishDate))
                    {
                        FinishDate = exp.FinishDate;
                    }
                }

                return StartDate.Year +
                        ((FinishDate == null)
                            ? " ..."
                            : "-" + FinishDate.Value.Year);
            }
           
            
        }
  
    }
}