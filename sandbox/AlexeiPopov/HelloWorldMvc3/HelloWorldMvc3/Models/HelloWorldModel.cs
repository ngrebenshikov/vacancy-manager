using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;

namespace HelloWorldMvc3.Models
{
    public class HelloWorldPhrase
    {
        [Key]
        public Guid Id { get; set; }

        public string Phrase1 { get; set; }
        public string Phrase2 { get; set; }
    }

    public class HelloWorldContext : DbContext
    {
        public DbSet<HelloWorldPhrase> HelloWorldPhrases { get; set; }
    }
}