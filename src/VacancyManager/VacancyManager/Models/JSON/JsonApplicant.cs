using System;
using System.Collections.Generic;
using VacancyManager.Services.Managers;
using System.Linq;
using System.Web;

namespace VacancyManager.Models.JSON
{
    public class JsonApplicant
    {
        public int ApplicantID { get; set; }
        public string FullName { get; set; }
        public string FullNameEn { get; set; }
        public string ContactPhone { get; set; }
        public bool Employed { get; set; }
        public string Email { get; set; }
        public string Requirements { get; set; }

        public JsonApplicant()
        {
            ApplicantID = 0;
            FullName = "";
            FullNameEn = "";
            ContactPhone = "";
            Employed = false;
            Email = "";
            Requirements = "";
        }

        public Tuple<string, bool> AddToApplicantsStore()
        {   
            Tuple<string, bool> CreationStatus = new Tuple<string, bool>("Соискатель успешно добавлен", true);
            ApplicantID = ApplicantManager.Create(this);
            return CreationStatus;
        }

        public Tuple<string, bool> UpdateInApplicantsStore()
        {
            Tuple<string, bool> UpdateStatus = new Tuple<string, bool>("Информация о соискателе успешно изменена", true);
            ApplicantManager.Update(this);
            return UpdateStatus;
        }

        public Tuple<string, bool> DeleteFromApplicantsStore()
        {
            Tuple<string, bool> DeleteStatus = new Tuple<string, bool>("Информация о соискателе успешно удалена", true);
            ApplicantManager.Delete(this.ApplicantID);
            return DeleteStatus;
        }

    }
}