using System.Net.Mail;
using System;

namespace VacancyManager.Services
{
    internal static class MailSender
    {
        internal static int Port = 587;
        internal static string SmtpServer = "smtp.gmail.com";
        internal static string UserName = "vacmana@gmail.com";
        internal static string Password = "nextdaynewlive"; 
        internal static string Send(string To, string Subject, string Body)
        {
            try
            {
                MailMessage mail = new MailMessage(UserName, To, Subject, Body);
                SmtpClient client = new SmtpClient(SmtpServer);
                client.Port = Port;
                client.Credentials = new System.Net.NetworkCredential(UserName, Password);
                client.Send(mail);
                return "Сообщение отправленно";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}