using System;
using System.Collections.Generic;

namespace VMProject.Models
{
    public class Vacancy
    {
        public int VacancyID { get; set; }
        public string Title { get; set; }
        public DateTime OpeningDate { get; set; }
        public bool IsOpening { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Applicant> Applicants { get; set; }
    }
}