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

            var list = VMMailMessageManager.GetList();
            var cons = ConsiderationsManager.GetConsiderations();
 
            var res = (from apps in list
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
                           ConsiderationId = apps.ConsiderationId,
                           Vacancy_C = (from con in cons
                                        where con.ConsiderationID == apps.ConsiderationId
                                        select con.Vacancy.Title
                                        )
                       }).ToList();

            return Json(new
            {
                success = true,
                data = res
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SendVMMailMessage(string[] Emails, string Message, string subject, int consId)
        {
            string s;
            bool isBodyHtml = SysConfigManager.GetBoolParameter("IsBodyHtml", false);

            System.Web.HttpFileCollectionBase con = Request.Files;

            foreach (var Email in Emails)
                s = MailSender.SendTo(Email, subject, Message, isBodyHtml, con, consId);

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


                created = VMMailMessageManager.Create(obj["Sender"], "vacmana@gmail.com", obj["Subject"], obj["Text"], sendDate, deliveryDate, SendedMessage, 0, 0);
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
            List<VMMailMessage> CreatedMessage = new List<VMMailMessage>();

            if (data != null)
            {
                var obj = jss.Deserialize<dynamic>(data);
                VMMailMessageManager.Update(obj["Id"], obj["IsRead"], obj["ConsiderationId"]);
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
