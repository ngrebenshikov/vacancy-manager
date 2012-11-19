using System;
using System.Collections.Generic;
using System.Linq;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{
  internal static class InputMessageManager
  {
    static VacancyContext _db = new VacancyContext();

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
      var obj = _db.InputMessages.ToList();

      return obj;
    }

    internal static InputMessage Create(string sender, string subject, string text, DateTime sendDate, DateTime deliveryDate, Nullable<int> considerId)
    {
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
    /// Если вдруг понадобится обновлять все
    /// </summary>
    /// <param name="id"></param>
    /// <param name="sender"></param>
    /// <param name="subject"></param>
    /// <param name="text"></param>
    /// <param name="sendDate"></param>
    /// <param name="deliveryDate"></param>
    /// <param name="isRead"></param>
    /// <param name="considerId"></param>
    internal static void Update(int id, string sender, string subject, string text, DateTime sendDate, DateTime deliveryDate, bool isRead, int considerId)
    {
      var obj = _db.InputMessages.Where(message => message.Id == id).FirstOrDefault();

      if (obj != null)
      {
        obj.Sender = sender;
        obj.Subject = subject;
        obj.Text = text;
        obj.SendDate = sendDate;
        obj.DeliveryDate = deliveryDate;
        obj.IsRead = isRead;
        obj.ConsiderationId = considerId;
      }

      _db.SaveChanges();
    }

    /// <summary>
    /// Это если обновлять только поле IsRead. Думаю этого варианта будет достаточно
    /// </summary>
    /// <param name="id"></param>
    /// <param name="isRead"></param>
    internal static void Update(int id, bool isRead)
    {
      var obj = _db.InputMessages.Where(message => message.Id == id).FirstOrDefault();

      if (obj != null)
      {
        obj.IsRead = isRead;
      }

      _db.SaveChanges();
    }

    internal static void Delete(int id)
    {
      var obj = _db.InputMessages.Where(message => message.Id == id).FirstOrDefault();

      if (obj != null)
        _db.InputMessages.Remove(obj);

      _db.SaveChanges();
    }

    internal static void UpdateMailsListFromIMAP()
    {
      //Можно засунуть получение прямо в параметры getImapClient
      //Но тогда код загромождён будет
      string mailAdress = SysConfigManager.GetStringParametr(MailAdressConfigName, MailAdressDefault);
      string mailAdressPass = SysConfigManager.GetStringParametr(MailAdressPassConfigName, MailAdressPassDefault);
      string mailImapHost = SysConfigManager.GetStringParametr(MailImapHostConfigName, MailImapHostDefault);
      int mailImapPort = SysConfigManager.GetIntParametr(MailImapPortConfigName, MailImapPortDefault);

      using (var imap = ImapClientGetter.getImapClient(mailImapHost, mailAdress, mailAdressPass, mailImapPort))
      {
        //TODO:Сделать подстановку даты последного обновления из базы
        List<ImapMessage> messages = imap.GetNewLetters(new DateTime(2012, 11, 10));
        foreach (ImapMessage msg in messages)
        {
          Create(msg.Sender, msg.Subject, msg.Text, msg.SendDate, msg.DeliveryDate, null);
        }
        //TODO:Записать в базу дату последнего получения писем
      }
    }
  }
}