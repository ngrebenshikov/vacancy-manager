using System;
using System.Collections.Generic;
using System.Linq;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{
  internal static class VacancyDbManager
  {
    internal static IEnumerable<Vacancy> AllVisibleVacancies()
    {
      VacancyContext _db = new VacancyContext();
      return _db.Vacancies.Where(vacancy => vacancy.IsVisible).ToList();
    }

    internal static List<Vacancy> CreateVacancy(string title, string description, DateTime? openingDate, string requirments, bool isVisible)
    {
      VacancyContext _db = new VacancyContext();
      var vacancies = new List<Vacancy>
                            {
                                new Vacancy
                                { VacancyID = -1,
                                  Title = title,
                                  Description = description,
                                  OpeningDate = openingDate,
                                  Requirments = requirments,
                                  IsVisible = isVisible
                                }
                            };

      _db.Vacancies.Add(vacancies.First());
      _db.SaveChanges();

      return vacancies;

    }

    internal static void UpdateVacancy(int vacancyid, string title, string description, DateTime? openingDate, string requirments, bool isVisible)
    {
      VacancyContext _db = new VacancyContext();
      var update_rec = _db.Vacancies.SingleOrDefault(a => a.VacancyID == vacancyid);
      if (update_rec != null)
      {
        update_rec.Title = title;
        update_rec.Description = description;
        update_rec.OpeningDate = openingDate;
        update_rec.Requirments = requirments;
        update_rec.IsVisible = isVisible;
        _db.SaveChanges();
      }
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