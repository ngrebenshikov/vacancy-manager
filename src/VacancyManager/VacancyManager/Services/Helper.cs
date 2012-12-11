using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel;
using System.Text.RegularExpressions;

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

        internal static string Format(string input, TemplateProp prop)
        {
            foreach (PropertyDescriptor p in TypeDescriptor.GetProperties(prop))
                input = input.Replace("{" + p.Name + "}", (p.GetValue(prop) ?? "NULL").ToString());

            return input;
        }

        internal static string CutTags(string input)
        {
            string result = String.Empty;
            foreach (Match match in Regex.Matches(input, "<.*?>"))
            {
                result = input.Replace(match.Value, "").ToString();
                input = result;
            }
            foreach (Match match in Regex.Matches(input, "&nbsp"))
            {
                result = input.Replace(match.Value, "  ").ToString();
                input = result;
            }
            return result;
        }
    }

    public class TemplateProp
    {
        /// <summary>
        /// Имя пользователя
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 1. NewMessage - Пользователь добавивший новое сообщение
        /// </summary>
        public string Sender { get; set; }

        /// <summary>
        /// Почтовый ящик
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// 1. NewMessage - Дата отправки сообщения
        /// </summary>
        public string Date { get; set; }

        /// <summary>
        /// 1. NewMessage - Название вакансии
        /// </summary>
        public string Vacancy { get; set; }

        /// <summary>
        /// 1. NewMessage - Текст сообщения
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// 1. NewMessage - идентификатор сообщения
        /// 2. NewMessage_Topic - идентификатор Consideration
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Имя соискателя
        /// </summary>
        public string Applicant { get; set; }
    }
}