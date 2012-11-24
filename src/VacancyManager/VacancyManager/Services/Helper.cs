using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VacancyManager.Services
{
    internal static class Helper
    {
        /// <summary>
        /// Возвращает имя картинки для иконки файла. Деление пока очень условное.
        /// </summary>
        /// <param name="contentType">Тип содержимого файла.</param>
        /// <returns>Имя файла с картинкой без расширения.</returns>
        public static string MimeIcons(string contentType)
        {
            Dictionary<string, string[]> dict = new Dictionary<string, string[]>()
            {
                {"mime_doc", new string[]{"application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"}},
                {"mime_jpg", new string[]{"image/gif", "image/jpeg", "image/pjpeg", "image/png", "image/svg+xml", "image/tiff", "image/vnd.microsoft.icon"}},
                {"mime_txt", new string[]{"text/plain"}},
                {"mime_zip", new string[]{"application/zip", "application/x-zip-compressed", "application/x-gzip"}},
                {"mime_rar", new string[]{"application/x-rar-compressed"}},
                {"mime_pdf", new string[]{"application/pdf"}}
            };

            string result = "default";
            foreach (var d in dict)
                if (d.Value.Contains(contentType))
                    result = d.Key;

            return result;
        }
    }

    public class TemplateProp
    {
        public string Email { get; set; }
        public string Name { get; set; }
    }
}