using System;
using System.Collections.Generic;
using System.Web.Security;
using VacancyManager.Models;
using System.Linq; 

namespace VacancyManager.Services
{
    public interface IRepository : IDisposable
    {
        IEnumerable<Vacancy> AllVisibleVacancies();
        User GetUserByEmail(string email);
        User GetUserByUsername(string username);
        MembershipUser GetMembershipUserByUserName(string username);
        void CreateVacancy(string title, string description, DateTime? openingDate, string foreignLanguage, string requirments, bool isVisible);
        void UpdateVacancy(int vacancyid, string title, string description, DateTime? openingDate, string foreignLanguage, string requirments, bool isVisible);
        void DeleteVacancy(int vacancyid);
        void CreateUser(string username, string password, string email);
        bool ValidateUser(string username, string password);
    }
}