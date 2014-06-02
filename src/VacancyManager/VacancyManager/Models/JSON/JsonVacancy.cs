using System;
using System.Collections.Generic;
using VacancyManager.Services.Managers;
using System.Linq;
using System.Web;
using VacancyManager.Models;
namespace VacancyManager.Models.JSON
{
    public class JsonVacancy
    {
        public int VacancyID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string OpeningDate { get; set; }
        public string[] Requirements { get; set; }
        public string Link { get; set; }
        public bool IsVisible { get; set; }
        public int Considerations { get; set; }

        public JsonVacancy()
        {
            VacancyID = 0;
            Title = "";
            Description = "";
            OpeningDate = "";
            Link = "";
            IsVisible = true;
            Considerations = 0;
        }

        public Tuple<string, bool> AddToVacanciesStore()
        {
            VacancyID = VacancyDbManager.CreateVacancy(this);
            Tuple<string, bool> CreationStatus = new Tuple<string, bool>("Вакансия успешно создана", true);
            return CreationStatus;
        }

        public Tuple<string, bool> UpdateInVacanciesStore(string BaseAdress)
        {
            Vacancy CreatedVacancy = VacancyDbManager.UpdateVacancy(this);
            Requirements = (from reqs in CreatedVacancy.VacancyRequirements
                            where reqs.IsRequire
                            select reqs.Requirement.Name).ToArray();
            Link = BaseAdress + CreatedVacancy.SpecialKey;
            Tuple<string, bool> UpdateStatus = new Tuple<string, bool>("Вакансия успешно обновлена", true);
            return UpdateStatus;
        }

        public Tuple<string, bool> DeleteFromVacanciesStore()
        {
            VacancyDbManager.DeleteVacancy(VacancyID);
            Tuple<string, bool> DeleteStatus = new Tuple<string, bool>("Вакансия успешно удвлена", true);
            return DeleteStatus;
        }
    }
}