using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Services;
using VacancyManager.Services.Managers;
using System.Web.Script.Serialization;
using VacancyManager.Models;
using System.Web.Security;


namespace VacancyManager.Controllers
{
    public class CommentsController : BaseController
    {
        //
        JavaScriptSerializer jss = new JavaScriptSerializer();
        // GET: /Comments/
        [HttpGet]
        public JsonResult Load(int considerationId)
        {
            bool LoadSuccess = true;
            string LoadMessage = "Комментариии успешно загружены";
            var Comments = CommentsManager.GetComments(considerationId);

            var CommentsList = (from comms in Comments
                                orderby comms.CommentID descending
                                select new
                                 {
                                     CommentID = comms.CommentID,
                                     CreationDate = comms.CreationDate.ToShortDateString(),
                                     Body = comms.Body,
                                     UserID = comms.User.UserID,
                                     User = comms.User.UserName,
                                     ConsiderationID = comms.Consideration.ConsiderationID
                                 }

                             ).ToList();



            return Json(new
          {
              comments = CommentsList,
              success = LoadSuccess,
              message = LoadMessage
          }, JsonRequestBehavior.AllowGet);
        }


        //
        // GET: /Comments/Create
        [HttpPost]
        public ActionResult Create(string comments)
        {
            bool CreateSuccess = false;
            string CreateMessage = "При создании комментария произошла ошибка";
            object NewComment = null;
            if (comments != null)
            {
                var Comment = jss.Deserialize<dynamic>(comments);
                string Body = Comment["Body"].ToString();
                int ConsiderationID = Convert.ToInt32(Comment["ConsiderationID"]);
                string CurrentUserName = System.Web.HttpContext.Current.User.Identity.Name;
                VMMembershipUser CurrentUser = (VMMembershipUser)Membership.GetUser(CurrentUserName);
                Int32 CurrentUserKey = Convert.ToInt32(CurrentUser.ProviderUserKey);
                //CreatedComment = (CommentsManager.CreateComment(ConsiderationID, CurrentUserKey, Body)).ToList();
                Comment CreatedComment = (CommentsManager.CreateComment(ConsiderationID, CurrentUserKey, Body)).SingleOrDefault();
                CreateSuccess = true;

                var isSent = SendMessageToApplicant(CreatedComment.CommentID);

                CreateMessage = isSent ? "Комментарий успешно добавлен. Письмо отправлено" : "Комментарий успешно добавлен. Письмо не отправлено";

                //var NewComment = (from comms in CreatedComment
                //                  select new
                //                  {
                //                      CommentID = comms.CommentID,
                //                      CreationDate = comms.CreationDate.ToShortDateString(),
                //                      Body = comms.Body,
                //                      UserID = comms.UserID,
                //                      User = "",
                //                      ConsiderationID = comms.ConsiderationID
                //                  }
                //            ).ToList();

                NewComment = new
                {
                    CommentID = CreatedComment.CommentID,
                    CreationDate = CreatedComment.CreationDate.ToShortDateString(),
                    Body = CreatedComment.Body,
                    UserID = CreatedComment.UserID,
                    User = CurrentUserName,
                    ConsiderationID = CreatedComment.ConsiderationID
                };
            }
            
            return Json(new
            {
                data = NewComment,
                success = CreateSuccess,
                message = CreateMessage
            }, JsonRequestBehavior.DenyGet);
        }

        private bool SendMessageToApplicant(int createdCommentId)
        {
            string body;

            Comment createdComment = CommentsManager.GetComment(createdCommentId);

            TemplateProp p = new TemplateProp();
            p.Id = createdComment.CommentID.ToString();
            p.Message = createdComment.Body;
            p.Sender = createdComment.User.UserName;
            p.Vacancy = createdComment.Consideration.Vacancy.Title;
            p.Applicant = createdComment.Consideration.Applicant.FullName;
            p.Date = createdComment.CreationDate.ToString();

            body = Helper.Format(Templates.NewMessage, p);

            List<Comment> lastComments = CommentsManager.GetComments(createdComment.ConsiderationID).OrderByDescending(c => c.CreationDate).ToList();
            lastComments.RemoveAt(0);

            int prevMessageCountParameter = SysConfigManager.GetIntParameter("PrevMessageCount", 2);
            int prevMessageCount = lastComments.Count > prevMessageCountParameter ? prevMessageCountParameter : lastComments.Count;
            if (lastComments.Count > 0)
            {
                for (int i = 0; i <= prevMessageCount - 1; i++)
                {
                    p.Message = lastComments[i].Body;
                    p.Sender = lastComments[i].User.UserName;
                    p.Date = lastComments[i].CreationDate.ToString();
                    body += Helper.Format(Templates.LastMessage, p);
                }
            }
            else
                body += "Сообщения отстуствуют";

            p.Id = createdComment.ConsiderationID.ToString();
            bool isBodyHtml = SysConfigManager.GetBoolParameter("IsBodyHtml", false);
            if (!isBodyHtml)
                body = Helper.CutTags(body);
            string str = MailSender.Send(createdComment.Consideration.Applicant.Email, Helper.Format(Templates.NewMessage_Topic, p), body, isBodyHtml);

            return true;
        }

        //
        // GET: /Comments/Edit/5
        [HttpPost]
        public ActionResult Update(string comments)
        {
            bool UpdateSuccess = false;
            string UpdateMessage = "При обновлении комментария произошла ошибка";

            if (comments != null)
            {
                var UpdateComment = jss.Deserialize<dynamic>(comments);
                CommentsManager.UpdateComment(Convert.ToInt32(UpdateComment["CommentID"]),
                                              UpdateComment["Body"]);
                UpdateSuccess = true;
                UpdateMessage = "Комментарий успешно обновлен";
            }

            return Json(new
            {
                success = UpdateSuccess,
                message = UpdateMessage
            }, JsonRequestBehavior.DenyGet);
        }

        // GET: /Comments/Delete/5

        public ActionResult Delete(string comments)
        {
            bool DeleteSuccess = false;
            string DeleteMessage = "При удалении комментария произошла ошибка";

            if (comments != null)
            {
                var DeleteComment = jss.Deserialize<dynamic>(comments);
                CommentsManager.DeleteComment(Convert.ToInt32(DeleteComment["CommentID"]));
                DeleteSuccess = true;
                DeleteMessage = "Комментарий успешно удален";
            }

            return Json(new
            {
                success = DeleteSuccess,
                message = DeleteMessage
            }, JsonRequestBehavior.DenyGet);
        }

        //
        // POST: /Comments/Delete/5


    }
}
