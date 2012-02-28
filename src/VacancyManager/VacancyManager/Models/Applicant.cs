using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    /// <summary>
    /// Класс, описывающий сущность соискателя.
    /// </summary>
    public class Applicant
    {
        public int ApplicantID { get; set; }

        [Required(ErrorMessage = "Фамилия является обязательной.")]
        [MaxLength(50)]
        [Display(Name = "Фамилия")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Имя является обязательным.")]
        [MaxLength(50)]
        [Display(Name = "Имя")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Email является обязательным.")]
        public string Email { get; set; }

        public string FullName
        {
            get { return FirstName + " " + LastName; }
        }

        public virtual ICollection<Resume> Resumes { get; set; }
        public virtual ICollection<Consideration> Considerations { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<File> Files { get; set; } 
    }
}