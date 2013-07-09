using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using VacancyManager.Models;
using VacancyManager.Services.Managers;
using System.Web.Script.Serialization;
using VacancyManager.Services;
using System.Web.Security;
using System.IO;

namespace VacancyManager.Controllers
{
    public class VMMailMessageController : Controller
    {
        //
        // GET: /VMMailMessage/

        [HttpPost]
        public ActionResult SendVMMailMessage(string[] Emails, string Message, string subject)
        {
            TemplateProp p = new TemplateProp();

            var cont = new ContentResult();
            cont.ContentType = "text/plain";
            string CurrentUserName = System.Web.HttpContext.Current.User.Identity.Name;

            string body = Message;

            bool isBodyHtml = SysConfigManager.GetBoolParameter("IsBodyHtml", false);

            System.Web.HttpFileCollectionBase con = Request.Files;

            string s = MailSender.SendTo(Emails, subject, Message, isBodyHtml, con);

            return Json(new
                {
                    success = true,
                    msg = "Your file has been uploaded",
                }, "text/html");

        }

    }
}
