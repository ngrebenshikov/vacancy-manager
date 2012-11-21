using System;

namespace VacancyManager.Models
{
    public class Comment
    {
        public int CommentID { get; set; }
        public int UserID { get; set; }
        public int ConsiderationID { get; set; }
        public DateTime CreationDate { get; set; }

        public string Body { get; set; }

        public virtual User User { get; set; }
        public virtual Consideration Consideration { get; set; }
    }
}