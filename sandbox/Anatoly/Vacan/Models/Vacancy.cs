using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace Vacan.Models
{
  public class Vacancy
  {
    public int ID { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
  }

  public class VacancyDBContext : DbContext
  {
    public DbSet<Vacancy> Vacancies { get; set; }
  }
}