using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    /// <summary>
    /// Класс, описывающий сущность резюме.
    /// </summary>
    public class Resume
    {
        public int ResumeID { get; set; }

        [Display(Name = "Должность")]
        public string Position { get; set; }

        [Display(Name = "Краткая информация")]
        public string Summary { get; set; }

        [Display(Name = "Иностранные языки")]
        public string ForeignLanguage { get; set; }

        public string FirstName
        {
            get { return Applicant.FirstName; }
        }

        public string LastName
        {
            get { return Applicant.LastName; }
        }

        public virtual Applicant Applicant { get; set; }
        public virtual ICollection<PreviousExperience> PreviousExperiences { get; set; }
        public virtual ICollection<Education> Educations { get; set; }
        public virtual ICollection<TechnologyStack> TechnologyStacks { get; set; } 
    }
}