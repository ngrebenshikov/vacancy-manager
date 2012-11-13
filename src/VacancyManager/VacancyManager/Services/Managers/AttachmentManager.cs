using System;
using System.Collections.Generic;
using System.Linq;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{
    internal static class AttachmentManager
    {
        static VacancyContext _db = new VacancyContext();

        internal static IEnumerable<Attachment> GetList(int id)
        {
            var obj = _db.Attachments.Where(attach => attach.InputMessageId == id).ToList();
            return obj;
        }

        internal static void Create(string contentType, byte[] fileContent, string fileName, int inputMessageId)
        {
            Attachment obj = new Attachment
                          {
                              ContentType = contentType,
                              FileContent = fileContent,
                              FileGuid = Guid.NewGuid(),
                              FileName = fileName,
                              InputMessageId = inputMessageId
                          };

            _db.Attachments.Add(obj);
            _db.SaveChanges();
        }
    
        /*
         * 
         * "Конфликт инструкции INSERT с ограничением FOREIGN KEY \"FK_Attachment_InputMessage_InputMessageId\". Конфликт произошел в базе данных \"Vacancy\", таблица \"dbo.InputMessage\", column 'Id'.\r\nВыполнение данной инструкции было прервано."
             
         * internal static void Delete(int id)
                {
                    var obj = _db.Attachments.Where(app => app.ApplicantID == id).FirstOrDefault();

                    _db.Attachments.Remove(obj);
                    _db.SaveChanges();
                }

                internal static void Update(int id, string FullName, string contactPhone, string email)
                {
                    var obj = _db.Attachments.Where(app => app.ApplicantID == id).FirstOrDefault();

                    if (obj != null)
                    {
                        obj.FullName = FullName;
                        obj.ContactPhone = contactPhone;
                        obj.Email = email;
                    }

                    _db.SaveChanges();
                }
            */
    }
}