using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class Requirement
    {
      public int RequirementID { get; set; }

      public int RequirementStackID { get; set; }

        [Required(ErrorMessage = "�������� ���������� �������� ������������.")]
        public string Name { get; set; }
    }
}