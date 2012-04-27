using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employees.Models
{
    public class Position
    {
        public int PositionID {get; set;}
        public int EmployeeID { get; set; }
        public string NamePosition { get; set; }
        public virtual Employee Employees { get; set; }
    }
}