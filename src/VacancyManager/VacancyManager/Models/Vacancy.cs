using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class Vacancy
    {
        public int VacancyID { get; set; }

        [Required(ErrorMessage = "Название является обязательным.")]
        [Display(Name = "Название")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Описание является обезательным.")]
        [Display(Name = "Описание")]
        public string Description { get; set; }

        [DisplayFormat(DataFormatString = "{0:d}", ApplyFormatInEditMode = true)]
        [Display(Name = "Дата открытия")]
        public DateTime? OpeningDate { get; set; }

        [Display(Name = "Используемые технологии")]
        public string Technology { get; set; }

        [Display(Name = "Иностранные языки")]
        public string ForeignLanguage { get; set; }

        [Display(Name = "Требования")]
        public string Requirments { get; set; }

        public bool IsVisible { get; set; }

        public virtual ICollection<Consideration> Considerations { get; set; } 
    }
}