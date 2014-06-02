using System.Collections.Generic;
using System.Linq;
using VacancyManager.Models;
using VacancyManager.Models.JSON;

namespace VacancyManager.Services.Managers
{
  internal static class VacancyRequirementsManager
  {

    internal static IEnumerable<VacancyRequirement> GetVacancyRequirements(int id)
    {
      VacancyContext _db = new VacancyContext();
      return _db.VacancyRequirements.Where(vacancy_rec => vacancy_rec.VacancyID == id).ToList();
    }

    internal static void CreateVacancyRequirement(JsonVacancyRequirement VacancyReq)
    {
      VacancyContext _db = new VacancyContext();
      VacancyRequirement newVacancyRequirement = new VacancyRequirement
      {
        VacancyRequirementID = -1,
        VacancyID = VacancyReq.VacancyID,
        RequirementID = VacancyReq.RequirementID,
        Comments = VacancyReq.Comments,
        IsRequire = VacancyReq.IsRequire
      };

      _db.VacancyRequirements.Add(newVacancyRequirement);
      _db.SaveChanges();
    }

    internal static void UpdateVacancyRequirement(JsonVacancyRequirement VacancyReq)
    {
      VacancyContext _db = new VacancyContext();
      VacancyRequirement update_rec = _db.VacancyRequirements.FirstOrDefault(vacancy_rec => (vacancy_rec.VacancyRequirementID == VacancyReq.VacancyRequirementID));
      update_rec.Comments = VacancyReq.Comments;
      update_rec.IsRequire = VacancyReq.IsRequire;
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