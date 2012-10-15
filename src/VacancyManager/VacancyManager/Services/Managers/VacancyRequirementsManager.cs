using System.Collections.Generic;
using System.Linq;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{
  internal static class VacancyRequirementsManager
  {

    internal static IEnumerable<VacancyRequirement> GetVacancyRequirements(int id)
    {
      VacancyContext _db = new VacancyContext();
      return _db.VacancyRequirements.Where(vacancy_rec => vacancy_rec.VacancyID == id).ToList();
    }

    internal static void CreateVacancyRequirement(int vacancyid, int requirementid, string comments)
    {
      VacancyContext _db = new VacancyContext();
      var vacancyrequirement = new VacancyRequirement
      {
        VacancyRequirementID = -1,
        VacancyID = vacancyid,
        RequirementID = requirementid,
        Comments = comments
      };

      _db.VacancyRequirements.Add(vacancyrequirement);
      _db.SaveChanges();
    }

    internal static void UpdateVacancyRequirement(int vacancyid, int requirementid, string comments)
    {
      VacancyContext _db = new VacancyContext();
      var update_rec = _db.VacancyRequirements.SingleOrDefault(vacancy_rec => (vacancy_rec.VacancyID == vacancyid && vacancy_rec.RequirementID == requirementid));
      if (update_rec == null) return;
      update_rec.Comments = comments;
      _db.SaveChanges();
    }

    internal static void DeleteVacancyRequirement(int vacancyrequirementid)
    {
      VacancyContext _db = new VacancyContext();
      var delete_rec = _db.VacancyRequirements.SingleOrDefault(vacancy_rec => vacancy_rec.VacancyRequirementID == vacancyrequirementid);
      if (delete_rec == null) return;
      _db.VacancyRequirements.Remove(delete_rec);
      _db.SaveChanges();
    }
  }
}