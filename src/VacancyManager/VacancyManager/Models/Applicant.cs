using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class Applicant
    {   
        [Key]
        public int ApplicantID { get; set; }
        public string FIO { get; set; }
        public string ContactPhone { get; set; }
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Resume> Resumes { get; set; }
        public virtual ICollection<Consideration> Considerations { get; set; }
        public virtual ICollection<File> Files { get; set; }
    }
}