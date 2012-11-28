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

      var msgs = _imap.SearchMessages(
        SearchCondition.Undeleted().And(
          SearchCondition.SentSince(fromDate)));
      for (int index = 0; index < msgs.Length; index++)
      {
        var m = msgs[index].Value;
        /*IList<Attachment> alternativeViews = m.AlternateViews as IList<Attachment>;
        if (alternativeViews == null)
          continue;*/
        result.Add(new ImapMessage(m.From.Address, m.Subject, m.Body, m.Date, m.Date));
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
