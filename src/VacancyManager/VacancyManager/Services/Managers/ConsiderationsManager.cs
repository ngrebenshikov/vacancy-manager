using System;
using System.Collections.Generic;
using VacancyManager.Models;
using System.Linq;
using System.Web;

namespace VacancyManager.Services.Managers
{
    internal static class ConsiderationsManager
    {       
        #region Consideration

        internal static IEnumerable<Consideration> GetConsidrations(int vacancyId)
        {    
            VacancyContext _db = new VacancyContext();
            return _db.Considerations.Where(v => v.VacancyID == vacancyId).ToList();
        }

        internal static void DeleteConsidration(int considerationId)
        {
            VacancyContext _db = new VacancyContext();
            var delete_rec = _db.Considerations.SingleOrDefault(a => a.ConsiderationID == considerationId);

            if (delete_rec == null) return;

            _db.Considerations.Remove(delete_rec);
            _db.SaveChanges();
        }

        #endregion

    }
}