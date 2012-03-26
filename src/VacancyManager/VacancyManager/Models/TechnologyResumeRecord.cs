using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    /**
     * Запись о технологии в резюме
     */
    public class TechnologyResumeRecord
    {
        [Key]
        public int Id { get; set; }
        
        public string Comment { get; set; }

        public virtual Technology Technology { get; set; }
    }
}