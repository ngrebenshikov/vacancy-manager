using System.Collections.Generic;

namespace VMProject.Models
{
    public class Applicant
    {
        public int ApplicantID { get; set; }
        public string FullName { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Vacancy> Vacancies { get; set; }
    }
}