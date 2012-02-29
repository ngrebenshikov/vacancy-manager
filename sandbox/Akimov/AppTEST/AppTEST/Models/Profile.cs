using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AppTEST.Models
{
    public class Profile
    {
        public int profileId { get; set; }
        public DateTime PublDate { get; set; }
        public string Descr { get; set; }
        public int userID { get; set; }
        public virtual ICollection<Contacts1> Contacts1 { get; set; }
    }
}