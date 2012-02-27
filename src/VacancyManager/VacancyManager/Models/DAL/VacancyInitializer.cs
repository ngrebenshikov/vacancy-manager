using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity;

namespace VacancyManager.Models.DAL
{
    /// <summary>
    /// Простейшая инициализация.
    /// </summary>
    public class VacancyInitializer : DropCreateDatabaseIfModelChanges<VacancyContext>
    {
        protected override void Seed(VacancyContext context)
        {
            var resumes = new List<Resume>
                          {
                              new Resume
                              {
                                  Position = ".NET Junior developer",
                                  Summary = "Какой-то текст"
                              }
                          };
            resumes.ForEach(r => context.Resumes.Add(r));
            context.SaveChanges();

            var applicants = new List<Applicant>
                             {
                                 new Applicant
                                 {
                                     LatsName = "Иванов",
                                     FirstName = "Иван",
                                     Email = "ivan@ivanov.ru",
                                     Resumes = new Collection<Resume>(),
                                     Considerations = new Collection<Consideration>()
                                 }
                             };
            applicants.ForEach(a => context.Applicants.Add(a));
            context.SaveChanges();

            applicants[0].Resumes.Add(resumes[0]);
            context.SaveChanges();

            var vacancies = new List<Vacancy>
                            {
                                new Vacancy
                                {
                                    Title = ".NET junior developer",
                                    Description = "Требуется работник на данную вакансию",
                                    OpeningDate = DateTime.Now,
                                    Considerations = new Collection<Consideration>()
                                }
                            };
            vacancies.ForEach(v => context.Vacancies.Add(v));
            context.SaveChanges();

            var consideration = new Consideration
                                {
                                    Applicant = applicants[0],
                                    Vacancy = vacancies[0]
                                };
            context.Considerations.Add(consideration);
            context.SaveChanges();
        }
    }
}