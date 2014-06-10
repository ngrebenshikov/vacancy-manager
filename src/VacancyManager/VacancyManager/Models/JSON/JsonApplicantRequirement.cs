using System;
using System.Collections.Generic;
using VacancyManager.Services.Managers;
using System.Linq;
using System.Web;

namespace VacancyManager.Models.JSON
{
    public class JsonApplicantRequirement
    {
        public int Id { get; set; }
        public string StackName { get; set; }
        public int ApplicantId { get; set; }
        public int RequirementID { get; set; }
        public string RequirementName { get; set; }
        public string Comments { get; set; }
        public bool IsChecked { get; set; }

        public Tuple<string, bool> UpdateInApplicantRequirementsStore()
        {
            Tuple<string, bool> Status = new Tuple<string, bool>("", true);
            if (Id != 0)
            {
                ApplicantRequirementsManager.Update(this);
                Status = new Tuple<string, bool>("Требование успешно обновлено", true);
            }
            else
            {
                ApplicantRequirementsManager.Create(this);
                Status = new Tuple<string, bool>("Требование успешно создано", true);
            }

            return Status;
        }

    }
}