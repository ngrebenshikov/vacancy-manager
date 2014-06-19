using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VacancyManager.Services.Managers;

namespace VacancyManager.Models.JSON
{
    public class JsonResumeRequirement
    {
        public int Id { get; set; }
        public string StackName { get; set; }
        public int ResumeId { get; set; }
        public int RequirementStackID { get; set; }
        public int RequirementID { get; set; }
        public string RequirementName { get; set; }
        public string Comments { get; set; }
        public bool IsRequire { get; set; }


        public Tuple<string, bool> UpdateInResumeRequirementsStore()
        {
            Tuple<string, bool> Status = new Tuple<string, bool>("", true);
            if (Id != 0)
            {
                ResumeManager.UpdateResumeRequirement(Id, Comments, IsRequire);
                Status = new Tuple<string, bool>("Требование успешно обновлено", true);
            }
            else
            {
                ResumeRequirement NewResumeRequirement = ResumeManager.CreateResumeRequirement(ResumeId, RequirementID, Comments, IsRequire);
                Id = NewResumeRequirement.Id;
                Status = new Tuple<string, bool>("Требование успешно создано", true);
            }
            return Status;
        }

    }
}