using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    /// <summary>
    /// Класс, описывающий сущность пользователя и связанный с классом Aplicant связью 1:1.
    /// Реализация позаимствована из данного источника http://msdn.microsoft.com/ru-ru/asp.net/hh546908 
    /// </summary>
    public class User
    {
        [Key]
        public int ApplicantID { get; set; }

        [Required(ErrorMessage = "Роль является обязательной.")]
        [Display(Name = "Роль")]
        public string Role { get; set; }

        [Required(ErrorMessage = "Пароль является обязательным.")]
        [Display(Name = "Пароль")]
        public string Password { get; set; }

        public virtual Applicant Applicant { get; set; }
        public virtual ICollection<Comment> Comments { get; set; } 
    }
}