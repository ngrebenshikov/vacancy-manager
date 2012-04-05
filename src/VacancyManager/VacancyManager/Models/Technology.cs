using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class Technology
    {
        public int TechnologyID { get; set; }

        public int TechnologyStackID { get; set; }

        [Required(ErrorMessage = "�������� ���������� �������� ������������.")]
        public string Name { get; set; }
    }
}