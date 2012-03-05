using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class TechnologyStack
    {
        public int TechnologyStackID { get; set; }

        [Required(ErrorMessage = "Ќазвание стека технологий €вл€етс€ об€зательным.")]
        public string Name { get; set; }

        public virtual ICollection<Technology> Technologies { get; set; }
    }
}