using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    /// <summary>
    /// Класс, описывающий сущность рассмотрения заявки. В диаграмме представлен как таблица СоискательВакансия.
    /// </summary>
    public class Consideration
    {
        public int ConsiderationID { get; set; }
        public int VacancyID { get; set; }
        public int ApplicantID { get; set; }

        public virtual Applicant Applicant { get; set; }
        public virtual Vacancy Vacancy { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}