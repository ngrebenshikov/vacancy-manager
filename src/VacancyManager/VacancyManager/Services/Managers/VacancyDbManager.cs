using System;
using System.Collections.Generic;
using System.Linq;
using VacancyManager.Models;
using VacancyManager.Models.JSON;

namespace VacancyManager.Services.Managers
{
    internal static class VacancyDbManager
    {

        internal static Vacancy GetVacancyByID(int VacId)
        {
            VacancyContext _db = new VacancyContext();
            return _db.Vacancies.Where(vac => vac.VacancyID == VacId).FirstOrDefault();
        }

        internal static Vacancy GetVacancy(string speckey)
        {
            VacancyContext _db = new VacancyContext();
            return _db.Vacancies.Where(vac => vac.SpecialKey == speckey).FirstOrDefault();
        }

        internal static IEnumerable<Vacancy> AllVisibleVacancies()
        {
            VacancyContext _db = new VacancyContext();
            return _db.Vacancies.Where(vacancy => vacancy.IsVisible).ToList();
        }

        internal static int CreateVacancy(JsonVacancy NewVacancy)
        {
            VacancyContext _db = new VacancyContext();
            Vacancy vacancy = new Vacancy
                                      {
                                          VacancyID = -1,
                                          Title = NewVacancy.Title,
                                          Description = NewVacancy.Description,
                                          SpecialKey = Guid.NewGuid().ToString().Replace("-", "").ToLower(),
                                          OpeningDate = Convert.ToDateTime(NewVacancy.OpeningDate),
                                          IsVisible = NewVacancy.IsVisible
                                      };

            _db.Vacancies.Add(vacancy);
            _db.SaveChanges();

            return vacancy.VacancyID;

        }

        internal static Vacancy UpdateVacancy(JsonVacancy UpdateVacancy)
        {
            VacancyContext _db = new VacancyContext();
            Vacancy update_rec = _db.Vacancies.SingleOrDefault(a => a.VacancyID == UpdateVacancy.VacancyID);
            if (update_rec != null)
            {
                update_rec.Title = UpdateVacancy.Title;
                update_rec.Description = UpdateVacancy.Description;
                update_rec.OpeningDate = Convert.ToDateTime(UpdateVacancy.OpeningDate);
                if (update_rec.SpecialKey == null) { update_rec.SpecialKey = Guid.NewGuid().ToString().Replace("-", "").ToLower(); }
                update_rec.IsVisible = UpdateVacancy.IsVisible;
                _db.SaveChanges();
            }
            return update_rec;
        }

        internal static void DeleteVacancy(int vacancyid)
        {
            VacancyContext _db = new VacancyContext();
            var delete_rec = _db.Vacancies.SingleOrDefault(a => a.VacancyID == vacancyid);

            if (delete_rec == null) return;

            _db.Vacancies.Remove(delete_rec);
            _db.SaveChanges();
        }
    }
}