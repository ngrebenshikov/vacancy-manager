using System;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class SysConfig
    {
        [Key]
        public int Id { get; set; }

        //[Required(ErrorMessage="Имя параметра обязательно")]
        public string Name { get; set; }

        //[Required(ErrorMessage = "Значение параметра обязательно")]
        public string Value { get; set; }
    }
}