using System;
using System.Collections.Generic;

namespace VacancyManager.Services
{

  internal static class ImapClientGetter
  {
    internal static IImapClient getImapClient(string host, string username, string password, int port)
    {
      return new AeNetClient(host, username, password, port);
    }
  }
}
