using System.Net.Mail;
using System;
using VacancyManager.Models;
using VacancyManager.Services.Managers;
using System.Collections.Generic;
using System.Linq;
using System.Web.Security;


namespace VacancyManager.Services
{
  internal static class MailSender
  {
    private const string PortConfigName = "Port";

    internal static int Port = 587;
    internal static string SmtpServer = "smtp.gmail.com";
    internal static string UserName = "vacmana@gmail.com";
    internal static string Password = "nextdaynewlive";
    internal static List<string> Bcc = new List<string>();
    const int outputMessage = 2;

    internal static string SendTo(string To, string Subject, string Body, bool IsBodyHtml, System.Web.HttpFileCollectionBase wfiles, int consId)
    {
        string From = "vacmana@gmail.com";
        try
        {
            MailMessage mail = new MailMessage(UserName, To, Subject, Body);
            if (wfiles != null)
            {
                for (int j = 0; j <= wfiles.Count - 1; j++)
                {
                    var attfile = wfiles[j];
                    System.Net.Mail.Attachment mailattach = new System.Net.Mail.Attachment(attfile.InputStream, attfile.ContentType);
                    mailattach.Name = attfile.FileName;
                    mail.Attachments.Add(mailattach);
                }
            }

            mail.IsBodyHtml = true;

            SmtpClient client = new SmtpClient(SmtpServer);
            client.Port = null != Services.Managers.SysConfigManager.Get(PortConfigName) ? int.Parse(Services.Managers.SysConfigManager.Get(PortConfigName)) : Port;
            client.Credentials = new System.Net.NetworkCredential(UserName, Password);
            client.EnableSsl = true;
            client.Send(mail);

            int ApplicantId = 0;
            Applicant fromapp = new Applicant();
            fromapp = ApplicantManager.GetApplicantByEMail(To);
            ApplicantId = fromapp.ApplicantID;

            int messageId = VMMailMessageManager.Create(From, To, Subject, Body, DateTime.Now, DateTime.Now, outputMessage, ApplicantId, consId).Id;

            return "Сообщение отправленно";

        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }

    internal static string Send(string To, string Subject, string Body, bool IsBodyHtml)
    {
      try
      {
        MailMessage mail = new MailMessage(UserName, To, Subject, Body);
        mail.IsBodyHtml = IsBodyHtml;
        if (Bcc != null && Bcc.Count > 0)
          foreach (string address in Bcc)
            mail.Bcc.Add(address);
        SmtpClient client = new SmtpClient(SmtpServer);
        client.Port = null != Services.Managers.SysConfigManager.Get(PortConfigName) ? int.Parse(Services.Managers.SysConfigManager.Get(PortConfigName)) : Port;
        client.Credentials = new System.Net.NetworkCredential(UserName, Password);
        client.EnableSsl = true;
        client.Send(mail);
        return "Сообщение отправленно";
      }
      catch (Exception ex)
      {
        return ex.Message;
      }
    }

  

    /// <summary>
    /// Отправляет сообщение соискателю, 
    /// в случае появления новых комментариев по вакансии
    /// </summary>
    /// <param name="createdCommentId">Id нового комментария</param>
    /// <returns>Возвращает true, если не ошибок</returns>
    internal static bool SendMessageToApplicant(int createdCommentId)
    {
      string body;
      string subject;

      Comment createdComment = CommentsManager.GetComment(createdCommentId);

      TemplateProp p = new TemplateProp();
      p.Id = createdComment.CommentID.ToString();
      p.Message = createdComment.Body;
      p.Sender = createdComment.UserID != null ? createdComment.User.UserName : createdComment.Consideration.Applicant.FullName;
      p.Vacancy = createdComment.Consideration.Vacancy.Title;
      p.Applicant = createdComment.Consideration.Applicant.FullName;
      p.Date = createdComment.CreationDate.ToString();

      body = Helper.Format(Templates.NewMessage, p);

      List<Comment> lastComments = CommentsManager.GetComments(createdComment.ConsiderationID.Value).OrderByDescending(c => c.CreationDate).Where(x => x.User != null).ToList();
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
      subject = Helper.Format(Templates.NewMessage_Topic, p);

      bool isBodyHtml = SysConfigManager.GetBoolParameter("IsBodyHtml", false);
      if (!isBodyHtml)
        body = Helper.CutTags(body);
      MailSender.Send(createdComment.Consideration.Applicant.Email, subject, body, isBodyHtml);

      return true;
    }



    /// <summary>
    /// Отправляет сообщение администраторам, 
    /// в случае появления новых комментариев 
    /// от соискателя по вакансии
    /// </summary>
    /// <param name="createdCommentId">Id нового комментария</param>
    /// <returns>Возвращает true, если не ошибок</returns>
    internal static bool SendMessageToAdmins(int createdCommentId)
    {
      string body;
      string subject;

      Comment createdComment = CommentsManager.GetComment(createdCommentId);

      TemplateProp p = new TemplateProp();
      p.Id = createdComment.CommentID.ToString();
      p.Message = createdComment.Body;
      p.Sender = createdComment.UserID != null ? createdComment.User.UserName : createdComment.Consideration.Applicant.FullName;
      p.Vacancy = createdComment.Consideration.Vacancy.Title;
      p.Applicant = createdComment.Consideration.Applicant.FullName;
      p.Date = createdComment.CreationDate.ToString();

      body = Helper.Format(Templates.NewMessageAdmin, p);

      List<Comment> lastComments = CommentsManager.GetComments(createdComment.ConsiderationID.Value).OrderByDescending(c => c.CreationDate).ToList();
      lastComments.RemoveAt(0);

      int prevMessageCountParameter = SysConfigManager.GetIntParameter("PrevMessageCount", 2);
      int prevMessageCount = lastComments.Count > prevMessageCountParameter ? prevMessageCountParameter : lastComments.Count;
      if (lastComments.Count > 0)
      {
        for (int i = 0; i <= prevMessageCount - 1; i++)
        {
          p.Message = lastComments[i].Body;
          p.Sender = lastComments[i].UserID != null ? lastComments[i].User.UserName : lastComments[i].Consideration.Applicant.FullName;
          p.Date = lastComments[i].CreationDate.ToString();
          body += Helper.Format(Templates.LastMessage, p);
        }
      }
      else
        body += "Сообщения отстуствуют";

      p.Id = createdComment.ConsiderationID.ToString();
      subject = Helper.Format(Templates.NewMessage_Topic, p);

      bool isBodyHtml = SysConfigManager.GetBoolParameter("IsBodyHtml", false);
      if (!isBodyHtml)
        body = Helper.CutTags(body);

      List<string> admins = Roles.GetUsersInRole("Admin").ToList();
      foreach (var admin in admins)
        MailSender.Send(Membership.GetUser(admin).Email, subject, body, isBodyHtml);

      return true;
    }
  }
}