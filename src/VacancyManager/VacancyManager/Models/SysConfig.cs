using System;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class SysConfig
    {
        [Key]
        public string Name { get; set; }
        public string Value { get; set; }
    }
}