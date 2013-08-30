using System;
using System.Collections.Generic;

namespace VacancyManager.Services
{
  internal interface IImapClient : IDisposable
  {
    /// <summary>
    /// Выдаёт новые письма
    /// </summary>
    /// <param name="fromDate">Начиная с какой-то даты должны выбираться письма</param>
    /// <returns>Список из классов ImapMessage</returns>
    List<ImapMessage> GetNewLetters(DateTime fromDate);
  }
}
