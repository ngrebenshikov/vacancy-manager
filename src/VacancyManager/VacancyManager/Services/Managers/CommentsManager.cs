using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{
  public class CommentsManager
  {
      
    internal static List<Comment> GetComments(int? considerationId, int applicantId)
    {
      VacancyContext _db = new VacancyContext();
      List<Comment> Comments = new List<Comment>();
      if (considerationId.HasValue)
      { Comments = _db.Commentaries.Where(v => (v.Consideration.ConsiderationID == considerationId.Value && v.ApplicantID == applicantId)).ToList(); }
      else
      { Comments = _db.Commentaries.Where(v => v.ApplicantID == applicantId).ToList(); }
      return Comments;
    }

    internal static IEnumerable<Comment> GetAppComments(int AppId)
    {
        VacancyContext _db = new VacancyContext();
        return _db.Commentaries.Where(v => v.Consideration.ApplicantID == AppId || v.ApplicantID == AppId).ToList();
    }

    internal static Comment GetComment(int Id)
    {
      VacancyContext _db = new VacancyContext();
      return _db.Commentaries.Where(v => v.CommentID == Id).SingleOrDefault();
    }

    internal static Comment CreateComment(int? considerationId, int? userId, int? appId,  string body, string commenterName)
    {
      VacancyContext _db = new VacancyContext();

      if (considerationId == 0)
          considerationId = null;

      var NewComment =
                new Comment
            {
                ConsiderationID = considerationId,
                ApplicantID = appId,
                Body = body,
                CreationDate = DateTime.Now,
                UserID = userId,
                CommenterName = commenterName
            };

      _db.Commentaries.Add(NewComment);
      _db.SaveChanges();

      return NewComment;
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