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

        public virtual User User { get; set; }
        public virtual ICollection<PreviousExperience> PreviousExperiences { get; set; }
        public virtual ICollection<Education> Educations { get; set; }
        public virtual ICollection<TechnologyStack> TechnologyStacks { get; set; } 
    }
}