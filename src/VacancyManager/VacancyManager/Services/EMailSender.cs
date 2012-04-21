using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace VacancyManager.Services
{
  internal static class EMailSender
  {
    internal static bool SendMail(string messageBody, string to)
    {
      try
      {
        var message = new MailMessage("StudVacancyProject@mail.ru", to)
        {
          Subject = "Activate your account",
          Body = messageBody
        };
        var client = new SmtpClient("smtp.mail.ru");
        client.Credentials = new System.Net.NetworkCredential("StudVacancyProject", "StudVacancyProject!");
        client.Send(message);
        return true;
      }
      catch
      {
        return false;
      }
    }
  }
}