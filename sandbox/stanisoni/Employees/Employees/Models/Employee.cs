using System;
using System.Collections.Generic;

namespace Employees.Models
{
    public class Employee
    {
        public int EmployeeID { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public string MiddleName { get; set; }
        public virtual ICollection<Position> Positions { get; set; } 
    }
}