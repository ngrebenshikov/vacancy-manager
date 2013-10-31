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
    }
}