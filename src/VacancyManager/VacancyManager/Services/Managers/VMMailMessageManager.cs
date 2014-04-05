﻿using System;
using System.Collections.Generic;
using System.Linq;
using VacancyManager.Models;
using System.Web;

namespace VacancyManager.Services.Managers
{
    public class VMMailMessageManager
    {
        private const string MailAdressConfigName = "Mail Adress";
        private const string MailAdressPassConfigName = "Mail Password";
        private const string MailImapHostConfigName = "Mail ImapHost";
        private const string MailImapPortConfigName = "Mail Imap";

        private const string MailAdressDefault = "vacmana@gmail.com";
        private const string MailAdressPassDefault = "nextdaynewlive";
        private const string MailImapHostDefault = "imap.gmail.com";
        private const int MailImapPortDefault = 993;//С использованием SSL

        internal static IEnumerable<VMMailMessage> GetList()
        {
            VacancyContext _db = new VacancyContext();
            var obj = _db.VMMailMessages.ToList();

            return obj;
        }

        internal static IEnumerable<VMMailMessage> GetMessageById(int messageId)
        {
            VacancyContext _db = new VacancyContext();
            var obj = _db.VMMailMessages.Where(x => x.Id == messageId).ToList();
            return obj;
        }

        internal static VMMailMessage Create(string from, string to, string subject, string text, DateTime sendDate, DateTime deliveryDate, int MessageCat, int appId, int considerationId)
        {
            VacancyContext _db = new VacancyContext();
             var obj = new VMMailMessage
            {
                From = from,
                To = to,
                Subject = subject,
                MessageCategory = MessageCat,
                Text = text,
                SendDate = sendDate,          
                ApplicantId = appId,
                DeliveryDate = deliveryDate,
                ConsiderationId = considerationId
            };

            _db.VMMailMessages.Add(obj);
            _db.SaveChanges();

            return obj;
        }

        internal static void Update(int id, bool isRead, int consId)
        {
            VacancyContext _db = new VacancyContext();
            var obj = _db.VMMailMessages.FirstOrDefault(message => message.Id == id);

            if (obj != null)
            {
                obj.ConsiderationId = consId;
                obj.IsRead = isRead;
            }

            _db.SaveChanges();
        }

        internal static void Delete(int id)
        {
            VacancyContext _db = new VacancyContext();
            var obj = _db.VMMailMessages.FirstOrDefault(message => message.Id == id);

            if (obj != null)
                _db.VMMailMessages.Remove(obj);

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
                List<ImapMessage> messages = imap.GetNewLetters(new DateTime(2013, 7, 7));

                foreach (ImapMessage msg in messages)
                {
                    msg.SaveVMMailMessage();
                }
                //TODO:Записать в базу дату последнего получения писем
            }
        }
    }
}