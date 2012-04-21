using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace VacancyManager.Models
{
  public class VMMembershipUser : MembershipUser
  {
    //Подумать и возможно переделать в автоматические свойства
    private string _emailKey;
    private bool _isActivated;

    public string EmailKey
    {
      get { return _emailKey; }
      set { _emailKey = value; }
    }

    public bool IsActivated
    {
      get { return _isActivated; }
      set { _isActivated = value; }
    }


    public VMMembershipUser(string providername,
                            string username,
                            object providerUserKey,
                            string email,
                            string passwordQuestion,
                            string comment,
                            bool isApproved,
                            bool isLockedOut,
                            DateTime creationDate,
                            DateTime lastLoginDate,
                            DateTime lastActivityDate,
                            DateTime lastPasswordChangedDate,
                            DateTime lastLockedOutDate,
                            string EmailKey,
                            bool IsActivated)
      : base(providername,
             username,
             providerUserKey,
             email,
             passwordQuestion,
             comment,
             isApproved,
             isLockedOut,
             creationDate,
             lastLoginDate,
             lastActivityDate,
             lastPasswordChangedDate,
             lastLockedOutDate)
    {
      this.EmailKey = EmailKey;
      this.IsActivated = IsActivated;
    }
  }
}