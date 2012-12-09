using System;
using System.Collections.Generic;
using System.Linq;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{
  internal static class InputMessageManager
  {
    private const string MailAdressConfigName = "InboxEmail";
    private const string MailAdressPassConfigName = "InboxEmailPass";
    private const string MailImapHostConfigName = "InboxEmailImapHost";
    private const string MailImapPortConfigName = "InboxEmailImapPort";

    private const string MailAdressDefault = "vacmana@gmail.com";
    private const string MailAdressPassDefault = "nextdaynewlive";
    private const string MailImapHostDefault = "imap.gmail.com";
    private const int MailImapPortDefault = 993;//С использованием SSL

    internal static IEnumerable<InputMessage> GetList()
    {
      VacancyContext _db = new VacancyContext();
      var obj = _db.InputMessages.ToList();

      return obj;
    }

    internal static InputMessage Create(string sender, string subject, string text, DateTime sendDate, DateTime deliveryDate, Nullable<int> considerId)
    {
      VacancyContext _db = new VacancyContext();
      var obj = new InputMessage
      {
        Sender = sender,
        Subject = subject,
        Text = text,
        SendDate = sendDate,
        DeliveryDate = deliveryDate,
        //IsRead = false,
        ConsiderationId = considerId
      };

      _db.InputMessages.Add(obj);
      _db.SaveChanges();

      return obj;
    }

    /// <summary>
    /// Обновлять поле IsRead.
    /// </summary>
    /// <param name="id">id сообщения</param>
    /// <param name="isRead">Новое значение поля IsRead</param>
    internal static void Update(int id, bool isRead)
    {
      VacancyContext _db = new VacancyContext();
      var obj = _db.InputMessages.Where(message => message.Id == id).FirstOrDefault();

      if (obj != null)
      {
        obj.IsRead = isRead;
      }

      _db.SaveChanges();
    }

    internal static void Delete(int id)
    {
      VacancyContext _db = new VacancyContext();
      var obj = _db.InputMessages.Where(message => message.Id == id).FirstOrDefault();

      if (obj != null)
        _db.InputMessages.Remove(obj);

      _db.SaveChanges();
    }

    internal static void UpdateMailsListFromIMAP()
    {
      //Можно засунуть получение прямо в параметры getImapClient
      //Но тогда код загромождён будет
      string mailAdress = SysConfigManager.GetStringParameter(MailAdressConfigName, MailAdressDefault);
      string mailAdressPass = SysConfigManager.GetStringParameter(MailAdressPassConfigName, MailAdressPassDefault);
      string mailImapHost = SysConfigManager.GetStringParameter(MailImapHostConfigName, MailImapHostDefault);
      int mailImapPort = SysConfigManager.GetIntParameter(MailImapPortConfigName, MailImapPortDefault);

      using (var imap = ImapClientGetter.getImapClient(mailImapHost, mailAdress, mailAdressPass, mailImapPort))
      {
        //TODO:Сделать подстановку даты последного обновления из базы
        List<ImapMessage> messages = imap.GetNewLetters(new DateTime(2012, 12, 7));
        foreach (ImapMessage msg in messages)
        {
          Create(msg.Sender, msg.Subject, msg.Text, msg.SendDate, msg.DeliveryDate, null);
        }
        //TODO:Записать в базу дату последнего получения писем
      }
    }
  }
}