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
            var vacancies = new List<Vacancy>
                            {
                                new Vacancy
                                {
                                    Title = ".NET junior developer",
                                    Description = "Требуется работник на данную вакансию",
                                    IsVisible = true,
                                    OpeningDate = DateTime.Now,
                                    Considerations = new Collection<Consideration>()
                                }
                            };
            vacancies.ForEach(v => context.Vacancies.Add(v));
            context.SaveChanges();
        }
    }
}