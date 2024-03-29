using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
  public class RequirementStack
  {
    public int RequirementStackID { get; set; }

    [Required(ErrorMessage = "Название стека требований является обязательным.")]
    public string Name { get; set; }
    public string NameEn { get; set; }
    public virtual ICollection<Requirement> Requirements { get; set; }
  }
}