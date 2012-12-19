using System;
using System.Collections.Generic;
using System.IO;
using AE.Net.Mail;
using VacancyManager.Services.Managers;

namespace VacancyManager.Services
{
  internal class AeNetClient : IImapClient
  {
    private readonly ImapClient _imap;

    public AeNetClient(string host, string username, string password, int port)
    {
      _imap = new ImapClient(host, username, password, ImapClient.AuthMethods.Login, port, true);
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
      //_imap.Search(SearchCondition.SentSince(fromDate));

      foreach (string uid in uids)
      {
        var msg = _imap.GetMessage(uid, false, true);
        _imap.SetFlags(Flags.Seen, msg);
        string body = "Default string for fail";
        var attachments = (msg.Attachments as List<Attachment>);
        switch (msg.ContentType)
        {
          case "text/plain":
            if (attachments != null)
              body = string.IsNullOrEmpty(msg.Body) ? "<pre>" + (attachments)[0].Body + "</pre>" : "<pre>" + msg.Body + "</pre>";
            break;
          case "text/html":
            //Текст сообщения будет выглядеть как нагромождение тегов
            body = msg.Body;
            break;
          //Не знаю почему эта библиотека при таком contentType пихает сообщение в attachment
          //Но это нужно будет учитывать когда attacments будем прикреплять
          case "multipart/mixed":
          case "multipart/alternative":
            if (attachments != null)
              body = attachments[0].Body;
            break;
        }
        result.Add(new ImapMessage(msg.From.Address, msg.Subject, Microsoft.Security.Application.Sanitizer.GetSafeHtml(body), msg.Date, msg.Date));

        if (attachments == null) continue;
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
