using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;


namespace prjFactVakancies.Models
{
    public class Vakancy
    {   [Key]
        public int Vakancy_ID { get; set; }
        public string Profession { get; set; }
        public string Pol { get; set; }
        public string Vozrast { get; set; }
        public int Oklad { get; set; }
    }
}
