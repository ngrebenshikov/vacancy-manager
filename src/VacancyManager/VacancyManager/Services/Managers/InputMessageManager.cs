using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{
    internal static class InputMessageManager
    {
        static VacancyContext _db = new VacancyContext();

        internal static IEnumerable<InputMessage> GetList()
        {
            var obj = _db.InputMessages.ToList();

            return obj;
        }

        internal static void Create(string sender, string subject, string text, DateTime sendDate, DateTime deliveryDate, int considerId)
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
    }
}