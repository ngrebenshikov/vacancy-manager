﻿using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace VacancyManager.Models
{
    public class VacancyContext : DbContext
    {
        public DbSet<Consideration> Considerations { get; set; }
        public DbSet<Resume> Resumes { get; set; }
        public DbSet<Vacancy> Vacancies { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Comment> Commentaries { get; set; }
        public DbSet<File> Files { get; set; }
        public DbSet<PreviousExperience> PreviousExperiences { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<TechnologyStack> TechnologyStacks { get; set; }
        public DbSet<Technology> Technologies { get; set; } 

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}