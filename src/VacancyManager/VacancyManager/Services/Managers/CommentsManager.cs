using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{
    public class CommentsManager
    {


        internal static IEnumerable<Comment> GetComments(int considerationId)
        {
            VacancyContext _db = new VacancyContext();
            return _db.Commentaries.Where(v => v.Consideration.ConsiderationID == considerationId).ToList();
        }

        internal static IEnumerable<Comment> CreateComment(int considerationId, int userId, string body)
        {
            VacancyContext _db = new VacancyContext();

            var NewComment = new List<Comment> {
                new Comment
            {
                ConsiderationID = considerationId,
                Body = body,
                CreationDate = DateTime.Now,
                UserID = userId
            }};

            _db.Commentaries.Add(NewComment.First());
            _db.SaveChanges();

            return NewComment.ToList();
        }

        internal static void UpdateComment(int commentId, string body)
        {
            VacancyContext _db = new VacancyContext();
            var UpdateComment = _db.Commentaries.SingleOrDefault(a => a.CommentID == commentId);
            if (UpdateComment != null)
            {
                UpdateComment.Body = body;
                _db.SaveChanges();
            }
        }
        internal static void DeleteComment(int commentId)
        {
            VacancyContext _db = new VacancyContext();
            var DeleteComment = _db.Commentaries.SingleOrDefault(a => a.CommentID == commentId);

            if (DeleteComment == null) return;

            _db.Commentaries.Remove(DeleteComment);
            _db.SaveChanges();
        }

    }
}