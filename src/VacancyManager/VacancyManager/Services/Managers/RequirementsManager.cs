using System.Collections.Generic;
using System.Linq;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{
  internal static class RequirementsManager
  {
    #region RequirementStack

    /// <summary>
    /// Gets all requirement stacks.
    /// </summary>
    /// <returns>List of requirement stacks</returns>
    internal static IEnumerable<RequirementStack> GetAllRequirementStacks()
    {
      VacancyContext _db = new VacancyContext();
      return _db.RequirementStacks.ToList();
    }

    /// <summary>
    /// Creates the requirement stack.
    /// </summary>
    /// <param name="name">The name.</param>
    /// <returns>Returns ID of created requirement stack</returns>
    internal static int CreateRequirementStack(string name)
    {
      VacancyContext _db = new VacancyContext();
      var requirementStack = new RequirementStack
      {
        Name = name,
        RequirementStackID = -1,
      };
      _db.RequirementStacks.Add(requirementStack);
      _db.SaveChanges();
      return _db.RequirementStacks.ToList()[_db.RequirementStacks.Count() - 1].RequirementStackID;
    }

    /// <summary>
    /// Deletes the requirement stack.
    /// </summary>
    /// <param name="id">The id.</param>
    internal static void DeleteRequirementStack(int id)
    {
      VacancyContext _db = new VacancyContext();
      var delete_rec = _db.RequirementStacks.SingleOrDefault(a => a.RequirementStackID == id);
      if (delete_rec == null) return;
      _db.RequirementStacks.Remove(delete_rec);
      _db.SaveChanges();
    }

    /// <summary>
    /// Updates the requirement stack.
    /// </summary>
    /// <param name="id">The id.</param>
    /// <param name="name">The name.</param>
    internal static void UpdateRequirementStack(int id, string name)
    {
      VacancyContext _db = new VacancyContext();
      var update_rec = _db.RequirementStacks.SingleOrDefault(a => a.RequirementStackID == id);
      if (update_rec != null)
      {
        update_rec.Name = name;
        _db.SaveChanges();
      }
    }
    #endregion

    #region Requirement
    /// <summary>
    /// Gets the requirements.
    /// </summary>
    /// <returns>List of requirements</returns>
    internal static IEnumerable<Requirement> GetRequirements()
    {
      VacancyContext _db = new VacancyContext();
      return _db.Requirements.ToList();
    }

    /// <summary>
    /// Gets all requirements from RequirementStack
    /// </summary>
    /// <param name="id">The id of RequirementStack.</param>
    /// <returns>All requirements from RequirementStack with ID=id</returns>
    internal static IEnumerable<Requirement> GetAllRequirements(int id)
    {
      VacancyContext _db = new VacancyContext();
      var result = _db.RequirementStacks.FirstOrDefault(x => x.RequirementStackID == id);
      return result != null ? result.Requirements.ToList() : null;
    }

    /// <summary>
    /// Creates the requirement.
    /// </summary>
    /// <param name="id">The id of RequirementStack.</param>
    /// <param name="name">The name of requirement.</param>
    /// <returns>ID of created Requirement</returns>
    internal static int CreateRequirement(int id, string name)
    {
      VacancyContext _db = new VacancyContext();
      var requirement = new Requirement
      {
        Name = name,
        RequirementStackID = id,
        RequirementID = -1,
      };
      _db.Requirements.Add(requirement);
      _db.SaveChanges();
      return _db.Requirements.ToList()[_db.Requirements.Count() - 1].RequirementID;
    }

    /// <summary>
    /// Deletes the requirement.
    /// </summary>
    /// <param name="id">The id of requirement to delete.</param>
    internal static void DeleteRequirement(int id)
    {
      VacancyContext _db = new VacancyContext();
      var delete_rec = _db.Requirements.SingleOrDefault(a => a.RequirementID == id);
      if (delete_rec == null) return;
      _db.Requirements.Remove(delete_rec);
      _db.SaveChanges();
    }

    /// <summary>
    /// Updates the requirement.
    /// </summary>
    /// <param name="id">The id of updating requirement.</param>
    /// <param name="name">New name of requirement.</param>
    internal static void UpdateRequirement(int id, string name)
    {
      VacancyContext _db = new VacancyContext();
      var update_rec = _db.Requirements.SingleOrDefault(a => a.RequirementID == id);
      if (update_rec == null) return;
      update_rec.Name = name;
      _db.SaveChanges();
    }
    #endregion
  }
}