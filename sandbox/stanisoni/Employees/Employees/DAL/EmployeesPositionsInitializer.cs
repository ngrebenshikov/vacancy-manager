using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using Employees.Models;
using Employees.DAL;

namespace Employees.DAL
{
    public class EmployeesPositionsInitializer : DropCreateDatabaseIfModelChanges<EmployeesPositionsContext>
    {



        protected override void Seed(EmployeesPositionsContext context)
        {
            var employees = new List<Employee> 
            { 
                new Employee { LastName = "Иванов",   Name = "Ивано", MiddleName = "Иванович" }, 
                new Employee { LastName = "Петров",     Name = "Петр",    MiddleName = "Петрович" }, 
                new Employee { LastName = "Сидоров",    Name = "Сидр",     MiddleName = "Сидорович" }, 
                new Employee { LastName = "Кукушкин",    Name = "Кука", MiddleName = "Кукуневич" }, 
                new Employee { LastName = "Гавкин",      Name = "Гав",        MiddleName = "Гавкович" }, 
                new Employee { LastName = "Мяу",        Name = "Мяу",   MiddleName = "Мяумянович" },
            };
            employees.ForEach(s => context.Employees.Add(s));
            context.SaveChanges();

            var positions = new List<Position> 
            { 
                new Position { NamePosition = "programmer",EmployeeID = 1}, 
                new Position { NamePosition = "disigner",EmployeeID = 2},  
                new Position { NamePosition = "makeup",EmployeeID = 3}, 
                new Position { NamePosition = "programmer",EmployeeID = 4}, 
                new Position { NamePosition = "disigner",EmployeeID = 5},  
                new Position { NamePosition = "makeup",EmployeeID = 6},
            };
            positions.ForEach(s => context.Positions.Add(s));
            context.SaveChanges();
        }



    }
}