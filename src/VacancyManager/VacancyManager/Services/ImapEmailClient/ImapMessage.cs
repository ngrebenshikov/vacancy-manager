using System;

namespace VacancyManager.Services
{
  internal class ImapMessage
  {
    internal readonly string Sender;
    internal readonly string Subject;
    internal readonly string Text;
    internal readonly DateTime SendDate;
    internal readonly DateTime DeliveryDate;
    //TODO: добавить сюда вложения

    public ImapMessage(string sender, string subject, string text, DateTime sendDate, DateTime deliveryDate)
    {
      Sender = sender;
      Subject = subject;
      Text = text;
      SendDate = sendDate;
      DeliveryDate = deliveryDate;
    }
  }
}