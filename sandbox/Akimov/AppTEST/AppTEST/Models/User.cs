using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace AppTEST.Models
{
    public class User
    {
        public int userId { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Profile> Profile { get; set; }
    }
}