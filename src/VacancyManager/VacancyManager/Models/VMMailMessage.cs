using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class VMMailMessage
    {
        [Key]
        public int Id { get; set; }

        public DateTime SendDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Subject { get; set; }
        public string Text { get; set; }
        public int ApplicantId { get; set; }
        // Категория сообщения: 1 Входящее сообщение  
        //                      2 Исходящее сообщение 
        //                      3 Черновик
        public int MessageCategory { get; set; }
        public bool IsRead { get; set; }

        public virtual ICollection<Attachment> Attachments { get; set; }

    }
}