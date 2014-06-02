using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class ConsiderationStatus
    {
        [Key]
        public int ConsiderationStatusID { get; set; }
        public string Status { get; set; }

    }
}