using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
  public class RequirementStack
  {
    public int RequirementStackID { get; set; }

    [Required(ErrorMessage = "Ќазвание стека требований €вл€етс€ об€зательным.")]
    public string Name { get; set; }

    public virtual ICollection<Requirement> Requirements { get; set; }
  }
}