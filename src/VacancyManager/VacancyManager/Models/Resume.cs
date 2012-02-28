using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    /// <summary>
    /// �����, ����������� �������� ������.
    /// </summary>
    public class Resume
    {
        public int ResumeID { get; set; }

        [Display(Name = "���������")]
        public string Position { get; set; }

        [Display(Name = "������� ����������")]
        public string Summary { get; set; }

        //TODO �������� ��������� ����

        public string FirstName
        {
            get { return Applicant.FirstName; }
        }

        public string LastName
        {
            get { return Applicant.LatsName; }
        }

        public virtual Applicant Applicant { get; set; }
    }
}