using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class InputMessage
    {
        [Key]
        public int Id { get; set; }

        public DateTime SendDate { get; set; }
        public DateTime DeliveryDate { get; set; }

        public string Sender { get; set; }
        public string Subject { get; set; }
        public string Text { get; set; }

        public bool IsRead { get; set; }

        public Nullable<int> ConsiderationId { get; set; }

        public virtual ICollection<Attachment> Attachments { get; set; }
    }
}