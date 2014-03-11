using System;
using System.Collections.Generic;
using System.Linq;
using VacancyManager.Models;
using System.Security.Cryptography;

namespace VacancyManager.Services.Managers
{
  internal static class VacancyDbManager
  {
    static private MD5 crypto = MD5.Create();

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

    internal static Vacancy CreateVacancy(string title, string description, DateTime? openingDate, string requirments, bool isVisible)
    {
      VacancyContext _db = new VacancyContext();
      var vacancies = new Vacancy
                                { VacancyID = -1,
                                  Title = title,
                                  Description = description,
                                  SpecialKey = Guid.NewGuid().ToString().Replace("-","").ToLower(),
                                  OpeningDate = openingDate,
                                  Requirments = requirments,
                                  IsVisible = isVisible
                             };

      _db.Vacancies.Add(vacancies);
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
        if (update_rec.SpecialKey == null)
        {
            update_rec.SpecialKey = Guid.NewGuid().ToString().Replace("-","").ToLower();
        }
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