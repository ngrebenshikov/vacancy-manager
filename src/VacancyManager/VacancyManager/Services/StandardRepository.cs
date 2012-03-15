using System.Collections.Generic;
using System.Linq;
using VacancyManager.Models;

namespace VacancyManager.Services
{
    class StandardRepository : IRepository
    {
        private readonly VacancyContext _db = new VacancyContext();

        public IEnumerable<Vacancy> AllVisibleVacancies()
        {
            return _db.Vacancies.Where(vacancy => vacancy.IsVisible);
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}