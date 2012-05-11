using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace VacancyManager.Models
{
  public class VMMembershipUser : MembershipUser
  {
    public string EmailKey { get; set; }

    public string LastLockedOutReason { get; set; }

    public VMMembershipUser(string providername,
                            string username,
                            object providerUserKey,
                            string email,
                            string passwordQuestion,
                            string comment,
                            string lastLockedOutReason,
                            bool isApproved,
                            bool isLockedOut,
                            DateTime creationDate,
                            DateTime lastLoginDate,
                            DateTime lastActivityDate,
                            DateTime lastPasswordChangedDate,
                            DateTime lastLockedOutDate,
                            string EmailKey)
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
      LastLockedOutReason = lastLockedOutReason;
    }
  }
}