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
        [HttpGet]
        public ActionResult Index(int messagetype)
        {   

         //   if (messagetype == null)
         //       messagetype = defaultmessagetype;

            var list = VMMailMessageManager.GetList();



           var     res = (from apps in list
                           where (apps.MessageCategory == messagetype)
                           select new
                           {
                               Id = apps.Id,
                               Subject = apps.Subject,
                               From = apps.From,
                               To = apps.To,
                               Text = apps.Text,
                               IsRead = apps.IsRead,
                               SendDate = apps.SendDate,
                               DeliveryDate = apps.DeliveryDate,
                               Sender = String.Format("{0} ({1})", " ", apps.From)

                           }).ToList();

            return Json(new
            {
                success = true,
                data = res
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SendVMMailMessage(string[] Emails, string Message, string subject)
        {


            bool isBodyHtml = SysConfigManager.GetBoolParameter("IsBodyHtml", false);

            System.Web.HttpFileCollectionBase con = Request.Files;

            string s = MailSender.SendTo(Emails, subject, Message, isBodyHtml, con);

            return Json(new
                {
                    success = true,
                    msg = "Your file has been uploaded",
                }, "text/html");
        }


        [HttpPost]
        public ActionResult Create(string data)
        {
            bool success = false;
            const int SendedMessage = 2;
            string resultMessage = "Ошибка при добавлении сообщения";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            VMMailMessage created = new VMMailMessage();

            if (data != null)
            {
                var obj = jss.Deserialize<dynamic>(data);

                DateTime deliveryDate = new DateTime();
                DateTime sendDate = new DateTime();

   
                // Временная подстановка времени, потом удалить
                if (obj["SendDate"] == "" || obj["DeliveryDate"] == "")
                {
                    deliveryDate = DateTime.Now;
                    sendDate = DateTime.Now.Subtract(new TimeSpan(0, 10, 0));
                }
                else
                {
                    deliveryDate = Convert.ToDateTime(obj["DeliveryDate"]);
                    sendDate = Convert.ToDateTime(obj["SendDate"]);
                }


                created = VMMailMessageManager.Create(obj["Sender"], "vacmana@gmail.com", obj["Subject"], obj["Text"], sendDate, deliveryDate, SendedMessage, 0);
                resultMessage = "Сообщение успешно добавлено";
                success = true;
            }

            return Json(new
            {
                success = success,
                data = created,
                message = resultMessage
            });
        }

        [HttpPost]
        public ActionResult Update(string data)
        {
            bool success = false;
            string resultMessage = "Ошибка при изменении сообщения";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            if (data != null)
            {
                var obj = jss.Deserialize<dynamic>(data);
                VMMailMessageManager.Update(obj["Id"], obj["IsRead"]);
                resultMessage = "Сообщение успешно изменено";
                success = true;
            }

            return Json(new
            {
                success = success,
                message = resultMessage
            });
        }

        [HttpPost]
        public ActionResult Delete(string data)
        {
            bool success = false;
            string resultMessage = "Ошибка при удалении сообщения";
            JavaScriptSerializer jss = new JavaScriptSerializer();

            if (data == null)
            {
                if (HttpContext.Request.InputStream != null)
                {
                    HttpContext.Request.InputStream.Seek(0, SeekOrigin.Begin);
                    string str = new StreamReader(HttpContext.Request.InputStream).ReadToEnd();
                    var obj = jss.Deserialize<dynamic>(str);
                    foreach (var o in obj)
                    {
                        var q = jss.Deserialize<dynamic>(o["data"].ToString());
                        VMMailMessageManager.Delete(q["Id"]);
                    }
                    resultMessage = "Сообщение успешно удалено";
                    success = true;
                }
            }
            else
            {
                var obj = jss.Deserialize<dynamic>(data);
                VMMailMessageManager.Delete(obj["Id"]);
                resultMessage = "Сообщение успешно удалено";
                success = true;
            }

            return Json(new
            {
                success = success,
                message = resultMessage
            });
        }

        public ActionResult UpdateMailsListFromIMAP()
        {
            VMMailMessageManager.UpdateMailsListFromIMAP();
            return null;
        }

    }
}
