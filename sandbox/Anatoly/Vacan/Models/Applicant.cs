using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace Applican.Models
{
  public class Applicant
  {

    public int ID { get; set; }
    public string FirstName { get; set; }
    public string SecondName { get; set; }
    public string MiddleName { get; set; }
    public string MigrationTest { get; set; }
    //public string MigrationTest4 { get; set; }
    //public string MigrationTest2 { get; set; }
    //public string MigrationTest3 { get; set; }
    public string EMail { get; set; }
    public string FileName { get; set; }
  }

  public class ApplicantDbContext : DbContext
  {
    public DbSet<Applicant> Applicants { get; set; }
  }
}