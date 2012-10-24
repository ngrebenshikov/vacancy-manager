using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class Requirement
    {
        public int RequirementID { get; set; }

        public int RequirementStackID { get; set; }

        [Required(ErrorMessage = "Название требования является обязательным.")]
        public string Name { get; set; }
    }
}