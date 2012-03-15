using System;
using System.Collections.Generic;
using VacancyManager.Models;

namespace VacancyManager.Services
{
    public interface IRepository : IDisposable
    {
        IEnumerable<Vacancy> AllVisibleVacancies();
    }
}