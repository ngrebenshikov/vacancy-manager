using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class Requirement
    {
      public int RequirementID { get; set; }

      public int RequirementStackID { get; set; }

        [Required(ErrorMessage = "Ќазвание требовани€ €вл€етс€ об€зательным.")]
        public string Name { get; set; }
    }
}