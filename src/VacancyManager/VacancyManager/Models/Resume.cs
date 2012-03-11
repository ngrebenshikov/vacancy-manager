using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    /// <summary>
    /// �����, ����������� �������� ������.
    /// </summary>
    public class Resume
    {
        public int ResumeID { get; set; }

        [Display(Name = "���������")]
        public string Position { get; set; }

        [Display(Name = "������� ����������")]
        public string Summary { get; set; }

        [Display(Name = "����������� �����")]
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