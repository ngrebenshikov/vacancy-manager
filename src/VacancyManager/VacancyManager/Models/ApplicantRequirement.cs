using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class ApplicantRequirement
    {
        [Key]
        public int Id { get; set; }
        public int ApplicantId { get; set; }
        public int RequirementId { get; set; }
        public string Comment { get; set; }
    }
}