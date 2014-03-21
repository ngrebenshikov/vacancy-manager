﻿using System;
using System.Linq;
using System.Web.Mvc;
using VacancyManager.Services;
using VacancyManager.Services.Managers;
using System.Web.Script.Serialization;
using VacancyManager.Models;
using System.Web.Security;


namespace VacancyManager.Controllers
{
    public class CommentsController : AdminController
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
                                     UserID = comms.User != null ? comms.User.UserID : -1,
                                     UserRoles = (from userRoles in comms.User.Roles.Where(r => r.Name == "Admin").DefaultIfEmpty(new Role())
                                                  select userRoles.Name).Single().ToString(),
                                     CommentatorName = comms.CommenterName,
                                     ConsiderationID = comms.Consideration.ConsiderationID,
                                     ApplicantId = comms.ApplicantID
                                 }

                             ).ToList();
            return Json(new
          {
              comments = CommentsList,
              success = LoadSuccess,
              message = LoadMessage
          }, JsonRequestBehavior.AllowGet);
        }


        // GET: /Comments/
        [HttpGet]
        public JsonResult LoadAppComments(int appId)
        {
            bool LoadSuccess = true;
            string LoadMessage = "Комментариии успешно загружены";
            var Comments = CommentsManager.GetAppComments(appId);
            var CommentsList = (from comms in Comments
                                orderby comms.CommentID descending
                                select new
                                {
                                    CommentID = comms.CommentID,
                                    CreationDate = comms.CreationDate.ToShortDateString(),
                                    Body = comms.Body,
                                    UserID = comms.User != null ? comms.User.UserID : -1,
                                    UserRoles = (from userRoles in comms.User.Roles.Where(r => r.Name == "Admin").DefaultIfEmpty(new Role())
                                                 select userRoles.Name).Single().ToString(),
                                    CommentatorName = comms.CommenterName,
                                    VacancyName = comms.Consideration != null ? comms.Consideration.Vacancy.Title: "",
                                    ApplicantId = comms.ApplicantID,
                                    ConsiderationID =  comms.ConsiderationID
                                                    
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

                string CurrentUserName = System.Web.HttpContext.Current.User.Identity.Name;
                VMMembershipUser CurrentUser = (VMMembershipUser)Membership.GetUser(CurrentUserName);
                int CurrentUserKey = Convert.ToInt32(CurrentUser.ProviderUserKey);
                Comment CreatedComment = (CommentsManager.CreateComment(Comment["ConsiderationID"], CurrentUserKey, Comment["ApplicantId"], Body, CurrentUser.UserName));
 
                CreateSuccess = true;

                NewComment = new
                {
                    CommentID = CreatedComment.CommentID,
                    CreationDate = CreatedComment.CreationDate.ToShortDateString(),
                    Body = CreatedComment.Body,
                    ApplicantId = CreatedComment.ApplicantID,
                    UserID = CreatedComment.UserID,
                    User = CurrentUserName,
                    CommentatorName = CurrentUser.UserName,
                    ConsiderationID = CreatedComment.ConsiderationID
                };
            }

            return Json(new
            {
                comments = NewComment,
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
    }
}
