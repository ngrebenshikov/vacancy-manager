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

        internal static Attachment Get(int id)
        {
            var obj = _db.Attachments.First(attach => attach.Id == id);
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
    }
}