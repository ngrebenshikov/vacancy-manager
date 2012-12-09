using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace prjFactVakancies.Models
{
    public class VakancyContext : DbContext
    {
       public DbSet<Vakancy> Vakancies {get; set;}
    }
}