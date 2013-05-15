using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using AE.Net.Mail;

namespace VacancyManager.Services
{
  internal class AeNetClient : IImapClient
  {
    private readonly ImapClient _imap;

    public AeNetClient(string host, string username, string password, int port)
    {
      _imap = new ImapClient(host, username, password, ImapClient.AuthMethods.Login, port, true);
    }

    private string AlternativeViewToMsgBody(Attachment attachment)
    {
      switch (attachment.ContentType)
      {
        case "text/html":
          return attachment.Body;//Microsoft.Security.Application.Encoder.JavaScriptEncode(attachment.Body);
        case "text/plain":
          return "<pre>" + attachment.Body + "</pre>";
        default:
          return "";
      }
    }

    #region Implementation of IImapClient

    /// <summary>
    /// Выдаёт новые письма
    /// </summary>
    /// <param name="fromDate">Начиная с какой-то даты должны выбираться письма</param>
    /// <returns>Список из классов ImapMessage</returns>
    public List<ImapMessage> GetNewLetters(DateTime fromDate)
    {
      _imap.SelectMailbox("INBOX");

      List<ImapMessage> result = new List<ImapMessage>();

      string[] uids = _imap.Search(SearchCondition.Unseen());
      _imap.Search(SearchCondition.SentSince(fromDate));

      foreach (string uid in uids)
      {
        var msg = _imap.GetMessage(uid, false, true);
        _imap.SetFlags(Flags.Seen, msg);
        string body = "Default string for fail";
        var attachments = (msg.Attachments as List<Attachment>);
        var alternativeViews = (msg.AlternateViews as List<Attachment>);
        switch (msg.ContentType)
        {
          case "text/plain":
            if (attachments != null)
              body = string.IsNullOrEmpty(msg.Body) ? "<pre>" + (attachments)[0].Body + "</pre>" : "<pre>" + msg.Body + "</pre>";
            else if (string.IsNullOrEmpty(msg.Body))
              body = "<pre>" + msg.Body + "</pre>";
            break;
          case "text/html":
            //Текст сообщения будет выглядеть как нагромождение тегов
            body = msg.Body;//Microsoft.Security.Application.Sanitizer.GetSafeHtml(msg.Body);
            break;
          //Не знаю почему эта библиотека при таком contentType пихает сообщение в attachment
          //Но это нужно будет учитывать когда attacments будем прикреплять
          case "multipart/mixed":
          case "multipart/alternative":
            if (attachments != null)
            {
              body = AlternativeViewToMsgBody(attachments[0]);
            }
            else if (alternativeViews != null)
            {
              body = AlternativeViewToMsgBody(alternativeViews[0]);
            }
            break;
        }
        result.Add(new ImapMessage(msg.From.Address, msg.Subject, body, msg.Date, msg.Date));

        if (attachments != null)
          foreach (Attachment attachment in attachments)
          {
            if (!attachment.Headers.ContainsKey("Content-Type"))
              continue;

            string filename = attachment.Headers["Content-Type"].RawValue;
            int fileNamePos = filename.IndexOf("name=\"", StringComparison.Ordinal);

            if (fileNamePos == -1)
              continue;

            filename = filename.Substring(fileNamePos + 6, filename.Length - 1 - (fileNamePos + 6));
            result[result.Count - 1].AddAttachment(attachment.ContentType, attachment.GetData(), filename);
          }

        //Дальше чудо код который исправляет косяки библиотеки
        //Которая не понимает gmail аттачи и кидает их в alternativeViews
        if (alternativeViews != null)
          foreach (Attachment alternativeView in alternativeViews)
          {
            if (alternativeView.ContentType != "")
              continue;

            AntsCode.Util.MultipartParser parser = new AntsCode.Util.MultipartParser(new MemoryStream(alternativeView.Encoding.GetBytes(alternativeView.Body)), alternativeView.Encoding, true);
            result[result.Count - 1].AddAttachment(parser.ContentType, parser.FileContent, parser.FileName);
          }
      }
      return result;
    }

    #endregion

    #region Implementation of IDisposable

    /// <summary>
    /// Выполняет определяемые приложением задачи, связанные с удалением, высвобождением или сбросом неуправляемых ресурсов.
    /// </summary>
    /// <filterpriority>2</filterpriority>
    public void Dispose()
    {
      _imap.Dispose();
    }

    #endregion
  }
}
