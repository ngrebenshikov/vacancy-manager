﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System;

namespace VacancyManager.Models
{
    public class Attachment
    {
        [Key]
        public int Id { get; set; }
        public Guid FileGuid { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public byte[] FileContent { get; set; }
        public int InputMessageId { get; set; }

        public virtual InputMessage InputMessage { get; set; }
    }
}