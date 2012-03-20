using System;
using System.Collections.Generic;
using System.Web.Security;
using VacancyManager.Models;

namespace VacancyManager.Services
{
    public interface IRepository : IDisposable
    {
        IEnumerable<Vacancy> AllVisibleVacancies();
        User GetUserByEmail(string email);
        User GetUserByUsername(string username);
        MembershipUser GetMembershipUserByUserName(string username);
        void CreateUser(string username, string password, string email);
        bool ValidateUser(string username, string password);
    }
}