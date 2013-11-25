using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    /// <summary>
    /// Класс, описывающий сущность резюме.
    /// </summary>
    public class Resume
    {
        public int ResumeId { get; set; }

        public string Position { get; set; }
        public string Summary { get; set; }

        public virtual ICollection<ResumeRequirement> ResumeRequirements { get; set; }
        public virtual ICollection<Experience> Experiences { get; set; }

        public DateTime Date { get; set; }
        public virtual Applicant Applicant { get; set; }

        public string Training { get; set; }
        public string AdditionalInformation { get; set; }

        private string s;
        public string GetExp {
            get
            {
                DateTime? LateDate = new DateTime ();
                DateTime BeforeDate = new DateTime (2200, 11, 12);
                foreach (var exp in Experiences)
                {
                    if (exp.FinishDate == null)
                    {
                        foreach (var expp in Experiences)
                        {
                            if (expp.StartDate < BeforeDate)
                            {
                                BeforeDate = expp.StartDate;
                            }
                        }
                        s = BeforeDate.Year.ToString() + ' ' + "...";
                        break;
                    }
                    else
                    {
                        if (exp.StartDate.Year  < BeforeDate.Year )
                            {
                                BeforeDate = exp.StartDate;
                            }
                            if (exp.FinishDate > LateDate)
                            {
                                LateDate = exp.FinishDate;
                            }
                        }
                        s = BeforeDate.Year + "-" + LateDate.ToString().Substring(6,4);
                }

                return s;   
            }
           
            
        }
  
    }
}