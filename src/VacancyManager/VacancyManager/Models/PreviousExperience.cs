using System;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class PreviousExperience
    {
        public int PreviousExperienceID { get; set; }

        [Display(Name = "Место работы")]
        public string Job { get; set; }

        [DisplayFormat(DataFormatString = "{0:d}", ApplyFormatInEditMode = true)]
        [Display(Name = "Дата начала работы")]
        public DateTime StartDate { get; set; }

        [DisplayFormat(DataFormatString = "{0:d}", ApplyFormatInEditMode = true)]
        [Display(Name = "Дата окончания работы")]
        public DateTime? FinishDate { get; set; }

        [Display(Name = "Должность")]
        public string Position { get; set; }

        [Display(Name = "Обязаности")]
        public string Duties { get; set; }

        [Display(Name = "Используемые технологии")]
        public string Technologies { get; set; }

        public virtual User User { get; set; }
    }
}