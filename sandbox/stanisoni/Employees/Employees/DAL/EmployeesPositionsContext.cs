using System;
using System.Collections.Generic;
using System.Data.Entity;
using Employees.Models;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Employees.Models
{
    public class EmployeesPositionsContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Position> Positions { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}