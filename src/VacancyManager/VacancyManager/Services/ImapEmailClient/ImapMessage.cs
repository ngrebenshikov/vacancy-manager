using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Security;
using VacancyManager.Models;
using VacancyManager.Services.Managers;

namespace VacancyManager.Services
{
  internal class ImapMessage
  {
    private readonly string Sender;
    private readonly string Subject;
    private readonly string Text;
    private readonly DateTime SendDate;
    private readonly DateTime DeliveryDate;
    private int InputMessageId;
    //Tuple<contentType, fileContent, fileName>
    private readonly List<Tuple<string, byte[], string>> Attachments;

    public ImapMessage(string sender, string subject, string text, DateTime sendDate, DateTime deliveryDate)
    {
      Sender = sender;
      Subject = subject;
      Text = text;
      SendDate = sendDate;
      DeliveryDate = deliveryDate;
      Attachments = new List<Tuple<string, byte[], string>>();
    }

    internal void SetInputMessageId(int id)
    {
      InputMessageId = id;
    }

    internal void AddAttachment(string contentType, byte[] fileContent, string fileName)
    {
      Attachments.Add(new Tuple<string, byte[], string>(contentType, fileContent, fileName));
    }

    public void AddToBase()
    {
      int? condsiderId = null;
      string[] splittedSubject = Subject.Split(' ');
      foreach (string word in splittedSubject)
      {
        if (string.IsNullOrWhiteSpace(word) || word == "")
          continue;
        int tmp;
        if (int.TryParse(word.Substring(1), out tmp))
        {
          condsiderId = tmp;
          break;
        }
      }

      if (condsiderId.HasValue)
      {
        string CurrentUserName = System.Web.HttpContext.Current.User.Identity.Name;
        VMMembershipUser CurrentUser = (VMMembershipUser)Membership.GetUser(CurrentUserName);
        Int32 CurrentUserKey = Convert.ToInt32(CurrentUser.ProviderUserKey);
        Comment CreatedComment = CommentsManager.CreateComment(condsiderId.Value, CurrentUserKey, Text).SingleOrDefault();
        MailSender.SendMessageToAdmins(CreatedComment.CommentID);
      }

      int messageId = InputMessageManager.Create(Sender, Subject, Text, SendDate, DeliveryDate, condsiderId).Id;

      foreach (var attachment in Attachments)
      {
        AttachmentManager.Create(attachment.Item1, attachment.Item2, attachment.Item3, messageId);
      }
    }
  }
}