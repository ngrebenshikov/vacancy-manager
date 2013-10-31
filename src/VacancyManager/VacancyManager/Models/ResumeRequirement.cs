﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class ResumeRequirement
    {
        [Key]
        public int Id { get; set; }
        public int ResumeId { get; set; }
        public int RequirementId { get; set; }
        public string Comment { get; set; }
        public bool IsChecked { get; set; }
    }
}