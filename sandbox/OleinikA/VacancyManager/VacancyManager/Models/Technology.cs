using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class Technology
    {
        public int TechnologyID { get; set; }

        [Required(ErrorMessage = "Название технологии является обязательным.")]
        public string Name { get; set; }
    }
}