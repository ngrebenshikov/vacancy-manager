using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace VacancyManager.Models
{
    public class UserInfo
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [MaxLengthAttribute(256)]
        public string Email { get; set; }

        [MaxLengthAttribute(256)]
        public string Name { get; set; }

    }
}


