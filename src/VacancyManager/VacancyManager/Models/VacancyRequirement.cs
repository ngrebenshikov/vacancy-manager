using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class VacancyRequirement
    {
        [Key]
        public int VacancyRequirementID { get; set; }

        public int VacancyID { get; set; }

        public int RequirementID { get; set; }
   
        [Display(Name = "Комментарий")]
        public string Comments { get; set; }

        public VacancyRequirement()
        {
            VacancyRequirementID = -1;  
        }
     }
}