using System;
using System.Collections.Generic;
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

      string[] uids = _imap.Search(SearchCondition.SentSince(fromDate));

      for (int i = 0; i < uids.Length; i++)
      {
        var msg = _imap.GetMessage(uids[i], false, true);
        string body = "";
        //Множество потенциальных NullRefereceException, но в каждом case, если мы туда попали, 100% такой кастинг будет валидным, либо нам прислали битые данные
        switch (msg.ContentType)
        {
          case "text/plain":
            body = string.IsNullOrEmpty(msg.Body) ? (msg.AlternateViews as List<Attachment>)[0].Body : msg.Body;
            break;
          case "text/html":
            //Текст сообщения будет выглядеть как нагромождение тегов
            body = msg.Body;
            break;
          case "multipart/mixed":
          case "multipart/alternative":
            body = (msg.Attachments as List<Attachment>)[0].Body;
            break;
        }
        result.Add(new ImapMessage(msg.From.Address, msg.Subject, body, msg.Date, msg.Date));
      }
      /*var msgs = _imap.SearchMessages(
        SearchCondition.Undeleted().And(
          SearchCondition.SentSince(fromDate)));*/
      /*for (int index = 0; index < msgs.Length; index++)
      {
        var m = msgs[index].Value;
        /*IList<Attachment> alternativeViews = m.AlternateViews as IList<Attachment>;
        if (alternativeViews == null)
          continue;*/
      /*result.Add(new ImapMessage(m.From.Address, m.Subject, m.Body, m.Date, m.Date));
    }*/
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
