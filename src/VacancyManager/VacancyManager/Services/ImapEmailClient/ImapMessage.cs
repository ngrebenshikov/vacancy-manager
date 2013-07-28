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
    private readonly string From;
    private readonly string To;
    private readonly string Subject;
    private readonly string Text;
    private readonly DateTime SendDate;
    private readonly DateTime DeliveryDate;
    private int MessageId;
    //Tuple<contentType, fileContent, fileName>
    private readonly List<Tuple<string, byte[], string>> Attachments;

    public ImapMessage(string from, string subject, string text, DateTime sendDate, DateTime deliveryDate)
    {
      From = from;
      To = "vacmana@gmail.com";
      Subject = subject;
      Text = text;
      SendDate = sendDate;
      DeliveryDate = deliveryDate;
      Attachments = new List<Tuple<string, byte[], string>>();
    }

    internal void SetMessageId(int id)
    {
     MessageId = id;
    }



    internal void AddAttachment(string contentType, byte[] fileContent, string fileName)
    {
      Attachments.Add(new Tuple<string, byte[], string>(contentType, fileContent, fileName));
    }

    public void AddToBase()
    {
      int? condsiderId = null;
      string[] splittedSubject = Subject.Split(' ');
      foreach (string word in splittedSubject.Where(word => !string.IsNullOrWhiteSpace(word) && word != ""))
      {
        int tmp;
        if ((word[0] != '#') || !int.TryParse(word.Substring(1), out tmp) ||
            !ConsiderationsManager.IsConsiderationExists(tmp))
          continue;
        condsiderId = tmp;
        break;
      }

      if (condsiderId.HasValue)
      {
        //Проверяем не от админа ли письмо
        MembershipUser possibleAdmin = Membership.GetUser(Membership.GetUserNameByEmail(From));
        Comment CreatedComment = null;
        if ((possibleAdmin != null) && Roles.IsUserInRole("Admin"))
        {
          CreatedComment = CommentsManager.CreateComment(condsiderId.Value, (int?)possibleAdmin.ProviderUserKey, Text, possibleAdmin.UserName).SingleOrDefault();
        }

        //Если не от админа, то проверим не от пользователя ли
        if (CreatedComment == null)
        {
            Applicant possibleApplicant = ApplicantManager.GetList().SingleOrDefault(x => x.Email.Equals(From, StringComparison.OrdinalIgnoreCase));
          if (possibleApplicant != null)
            CreatedComment = CommentsManager.CreateComment(condsiderId.Value, null, Text, possibleApplicant.FullName).SingleOrDefault();
        }

        //Посылаем сообщение всем админам
        if (CreatedComment != null)
          MailSender.SendMessageToAdmins(CreatedComment.CommentID);
      }

      int messageId = VMMailMessageManager.Create(From, "vacmana@gmail.com",Subject, Text, SendDate, DeliveryDate, 1, 0).Id;

      foreach (var attachment in Attachments)
      {
        AttachmentManager.Create(attachment.Item1, attachment.Item2, attachment.Item3, messageId);
      }
    }

    public void SaveVMMailMessage(int messageType)
    {
        int ApplicantId = 0;
        Applicant fromapp = new Applicant();
        
        if (fromapp != null)
            ApplicantId= fromapp.ApplicantID;
      
        int messageId = VMMailMessageManager.Create(From, To, Subject, Text, SendDate, DeliveryDate, messageType, ApplicantId).Id;

   
        fromapp = ApplicantManager.GetApplicantByEMail(From);

        foreach (var attachment in Attachments)
        {
            AttachmentManager.Create(attachment.Item1, attachment.Item2, attachment.Item3, messageId);
        }
    }


  }
}