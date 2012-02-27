using System;

namespace VacancyManager.Models
{
    public class Commentary
    {
        public int CommentaryID { get; set; }

        public DateTime DateOfCommentary { get; set; }

        public string BodyOfCommentary { get; set; }

        public virtual User User { get; set; }
        public virtual Consideration Consideration { get; set; }
    }
}