using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace VacancyManager.Models
{
    public class Experience
    {
        public int ExperienceId { get; set; }

        public string Job { get; set; }
        public string Project { get; set; }
        public string Position { get; set; }
        public int ResumeId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? FinishDate { get; set; }

        public string Duties { get; set; }

        public bool IsEducation { get; set; }

        public virtual ICollection<ExperienceRequirement> ExperienceRequirements { get; set; }
        public virtual Resume Resume { get; set; }
    }
}