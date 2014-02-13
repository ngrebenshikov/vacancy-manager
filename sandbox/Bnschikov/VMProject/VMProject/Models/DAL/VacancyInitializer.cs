using System;
using System.Collections.Generic;
using System.Data.Entity;

namespace VMProject.Models.DAL
{
    /// <summary>
    /// Класс для начальной инициализация базы данных
    /// </summary>
    public class VacancyInitializer : DropCreateDatabaseIfModelChanges<VacancyContext>
    {
        protected override void Seed(VacancyContext context)
        {
            var applicants = new List<Applicant>
                             {
                                 new Applicant { FullName = "Bob bob", Description = "Владею iOS SDK и ASP.NET MVC" }
                             };
            applicants.ForEach(a => context.Applicants.Add(a));
            context.SaveChanges();


            var vacancies = new List<Vacancy>
                            {
                                new Vacancy
                                {
                                    Title = "iOS Developer",
                                    OpeningDate = new DateTime(2012, 02, 23),
                                    IsOpening = true,
                                    Description = "Необходимо знание iOS SDK.",
                                    Applicants = new List<Applicant>()
                                },
                                new Vacancy
                                {
                                    Title = "ASP.NET MVC Developer",
                                    OpeningDate = new DateTime(2012, 02, 23),
                                    IsOpening = true,
                                    Description = "Необходимо знание ASP.NET MVC",
                                    Applicants = new List<Applicant>()
                                }
                            };
            vacancies.ForEach(v => context.Vacancies.Add(v));
            context.SaveChanges();

            vacancies[0].Applicants.Add(applicants[0]);
            vacancies[1].Applicants.Add(applicants[0]);
            context.SaveChanges();
        }
    }
}