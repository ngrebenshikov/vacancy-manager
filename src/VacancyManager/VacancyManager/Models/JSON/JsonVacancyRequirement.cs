using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VacancyManager.Services.Managers;

namespace VacancyManager.Models.JSON
{
    public class JsonVacancyRequirement
    {
        public int VacancyRequirementID { get; set; }
        public string StackName { get; set; }
        public int VacancyID { get; set; }
        public int RequirementStackID { get; set; }
        public int RequirementID { get; set; }
        public string RequirementName { get; set; }
        public string Comments { get; set; }
        public bool IsRequire { get; set; }

        public Tuple<string, bool> UpdateInVacancyRequirementsStore()
        {
            Tuple<string, bool> Status = new Tuple<string, bool>("", true);
            if (VacancyRequirementID != 0)
            {
                VacancyRequirementsManager.UpdateVacancyRequirement(this);
                Status = new Tuple<string, bool>("Требование успешно обновлено", true);
            }
            else
            {
                VacancyRequirementsManager.CreateVacancyRequirement(this);
                Status = new Tuple<string, bool>("Требование успешно создано", true);
            }

            return Status;
        }

    }
}