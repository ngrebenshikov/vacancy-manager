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

    internal static void CreateVacancyRequirement(int vacancyId, int requirementId, string comments, bool isRequire)
    {
      VacancyContext _db = new VacancyContext();
      var newVacancyRequirement = new VacancyRequirement
      {
        VacancyRequirementID = -1,
        VacancyID = vacancyId,
        RequirementID = requirementId,
        Comments = comments,
        IsRequire = isRequire
      };

      _db.VacancyRequirements.Add(newVacancyRequirement);
      _db.SaveChanges();
    }

    internal static void UpdateVacancyRequirement(int vacancyId, int vacancyRequirementId, int requirementId, string comments, bool isRequire)
    {
      VacancyContext _db = new VacancyContext();
      var update_rec = _db.VacancyRequirements.Single(vacancy_rec => (vacancy_rec.VacancyRequirementID == vacancyRequirementId));
      if (update_rec == null) return;
      update_rec.Comments = comments;
      update_rec.IsRequire = isRequire;
      _db.SaveChanges();
    }

    internal static void DeleteVacancyRequirement(int vacancyRequirementId)
    {
      VacancyContext _db = new VacancyContext();
      var delete_rec = _db.VacancyRequirements.Single(vacancy_rec => vacancy_rec.VacancyRequirementID == vacancyRequirementId);
      if (delete_rec == null) return;
      _db.VacancyRequirements.Remove(delete_rec);
      _db.SaveChanges();
    }
  }
}