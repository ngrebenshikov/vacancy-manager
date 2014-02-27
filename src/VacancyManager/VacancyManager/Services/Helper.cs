using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel;
using System.Text.RegularExpressions;
using VacancyManager.Properties;
using System.Globalization;

namespace VacancyManager.Services
{
    internal static class Helper
    {
        public class PdfResumeHeaders
        {
            public string Position { get; set; }
            public string Summary { get; set; }
            public string Competency { get; set; }
            public string Technologies { get; set; }
            public string ProfExp { get; set; }
            public string ProfExpProject { get; set; }
            public string Duties { get; set; }
            public string ExperienceRequirements { get; set; }
            public string Education { get; set; }
            public string CertsTraining { get; set; }
            public string ToNow { get; set; }
            public string AppFIO { get; set; }
            public string AdditionalInformation { get; set; }
            public CultureInfo ResumeCi { get; set; }
            public PdfResumeHeaders(string lanq)
            {
                if (lanq == "ru")
                {
                    Position = Resources.Position_ru;
                    Summary = Resources.Summary;
                    Competency = Resources.Competency;
                    Technologies = Resources.Technologies;
                    ProfExp = Resources.ProfExp;
                    ProfExpProject = Resources.ProfExpProject;
                    Duties = Resources.Duties;
                    ExperienceRequirements = Resources.ExperienceRequirements;
                    Education = Resources.Education;
                    CertsTraining = Resources.CertsTraining;
                    AdditionalInformation = Resources.AdditionalInformation;
                    ResumeCi = new CultureInfo("ru-ru");
                    ToNow = "настоящее время";
                }
                else if (lanq == "en")
                {
                    Position = ResourceEn.Position;
                    Summary = ResourceEn.Summary;
                    Competency = ResourceEn.Competency;
                    Technologies = ResourceEn.Technologies;
                    ProfExp = ResourceEn.ProfExp;
                    ProfExpProject = ResourceEn.ProfExpProject;
                    Duties = ResourceEn.Duties;
                    ExperienceRequirements = ResourceEn.ExperienceRequirements;
                    Education = ResourceEn.Education;
                    CertsTraining = ResourceEn.CertsTraining;
                    AdditionalInformation = ResourceEn.AdditionalInformation;
                    ResumeCi = new CultureInfo("en-us");
                    ToNow = "now";
                }
            }
        }


        public static string CheckLanq(string incText)
        {
            int Ru = 0, En = 0;
            string line = incText;
            for (int i = 0; i < line.Length; i++)
            {
                char c = line[i];
                if ((c >= 'А') && (c <= 'Я'))
                    Ru++;
                else if ((c >= 'A') && (c <= 'Z')) En++;
            }

            if (Ru > En)
                return "ru";
            else
                return "en";
        }

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

        /// <summary>
        /// Вырезает html тэги из шаблона
        /// </summary>
        /// <param name="input">Шаблон</param>
        /// <returns>Шаблон без тэгов</returns>
        internal static string CutTags(string input)
        {
            string result = String.Empty;
            foreach (Match match in Regex.Matches(input, "<.*?>"))
            {
                result = input.Replace(match.Value, "").ToString();
                input = result;
            }
            //foreach (Match match in Regex.Matches(input, "&nbsp;"))
            //{
            //    result = input.Replace(match.Value, " ").ToString();
            //    input = result;
            //}
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