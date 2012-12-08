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
            List<Comment> CreatedComment = null;
            if (comments != null)
            {
                var Comment = jss.Deserialize<dynamic>(comments);
                string Body = Comment["Body"].ToString();
                int ConsiderationID = Convert.ToInt32(Comment["ConsiderationID"]);
                string CurrentUserName = System.Web.HttpContext.Current.User.Identity.Name;
                VMMembershipUser CurrentUser = (VMMembershipUser)Membership.GetUser(CurrentUserName);
                Int32 CurrentUserKey = Convert.ToInt32(CurrentUser.ProviderUserKey);
                CreatedComment = (CommentsManager.CreateComment(ConsiderationID, CurrentUserKey, Body)).ToList();
                CreateSuccess = true;
                CreateMessage = "Комментарий успешно добавлен";

                Consideration cons = ConsiderationsManager.GetConsideration(ConsiderationID).SingleOrDefault();
                bool isSent = SendMailToApplicant(cons, Body, CurrentUser);
            }

            var NewComment = (from comms in CreatedComment
                              select new
                              {
                                  CommentID = comms.CommentID,
                                  CreationDate = comms.CreationDate.ToShortDateString(),
                                  Body = comms.Body,
                                  UserID = comms.UserID,
                                  User = "",
                                  ConsiderationID = comms.ConsiderationID
                              }
                        ).ToList();

            return Json(new
            {
                data = NewComment,
                success = CreateSuccess,
                message = CreateMessage
            }, JsonRequestBehavior.DenyGet);
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

        public bool SendMailToApplicant(Consideration cons, string comment, VMMembershipUser user)
        {
            TemplateProp prop = new TemplateProp()
            string body = Helper.Format(Templates.NewMessage, null);
            var state = MailSender.Send(cons.Applicant.Email, Templates.NewMessage_Topic, body, cons.ConsiderationID);
            
            return true;
        }
    }
}
