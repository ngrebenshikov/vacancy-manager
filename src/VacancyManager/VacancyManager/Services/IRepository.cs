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
        #region Vacancy
        void CreateVacancy(string title, string description, DateTime? openingDate, string foreignLanguage, string requirments, bool isVisible);
        void UpdateVacancy(int vacancyid, string title, string description, DateTime? openingDate, string foreignLanguage, string requirments, bool isVisible);
        void DeleteVacancy(int vacancyid);
        #endregion
        #region TechStack
        IEnumerable<TechnologyStack> GetAllTechStacks();
        void CreateTechStack(string name);
        void DeleteTechStack(int id);
        void UpdateTechStack(int id, string name);
        #endregion
        #region Technology
        IEnumerable<Technology> GetAllTechnologies(int id);
        void CreateTechnology(int id,string name);
        void DeleteTechnology(int id);
        void UpdateTechnology(int id, string name);
        #endregion
        void CreateUser(string username, string password, string email);
        bool ValidateUser(string username, string password);
    }
}