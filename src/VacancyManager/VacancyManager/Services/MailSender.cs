using System.Net.Mail;
using System;

namespace VacancyManager.Services
{
    internal static class MailSender
    {
        private const string PortConfigName = "Port";
        
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
                client.Port = null != Services.Managers.SysConfigManager.Get(PortConfigName) ? int.Parse(Services.Managers.SysConfigManager.Get(PortConfigName)) : Port;
                client.Credentials = new System.Net.NetworkCredential(UserName, Password);
                client.EnableSsl = true;
                client.Send(mail);
                return "Сообщение отправленно";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        internal static string Send(string To, string Subject, string Body, int consId)
        {
            try
            {
                MailMessage mail = new MailMessage(UserName, To, Subject, Body);

                mail.Headers.Add("X-ConsiderationId", consId.ToString());

                SmtpClient client = new SmtpClient(SmtpServer);
                client.Port = null != Services.Managers.SysConfigManager.Get(PortConfigName) ? int.Parse(Services.Managers.SysConfigManager.Get(PortConfigName)) : Port;
                client.Credentials = new System.Net.NetworkCredential(UserName, Password);
                client.EnableSsl = true;
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