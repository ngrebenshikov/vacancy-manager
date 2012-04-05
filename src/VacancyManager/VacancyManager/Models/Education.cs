using System;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class Education
    {
        public int EducationID { get; set; }

        [Display(Name = "Учебное заведение")]
        public string Institute { get; set; }

        [Display(Name = "Специальность")]
        public string Speciality { get; set; }

        [DisplayFormat(DataFormatString = "{0:d}", ApplyFormatInEditMode = true)]
        [Display(Name = "Дата начала учёбы")]
        public DateTime StartDate { get; set; }

        [DisplayFormat(DataFormatString = "{0:d}", ApplyFormatInEditMode = true)]
        [Display(Name = "Дата окончания работы")]
        public DateTime? FinishDate { get; set; }

        public virtual User User { get; set; }
    }
}