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

        //TODO Добавить остальные поля

        public string FirstName
        {
            get { return Applicant.FirstName; }
        }

        public string LastName
        {
            get { return Applicant.LatsName; }
        }

        public virtual Applicant Applicant { get; set; }
    }
}