using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Services.Managers;
using System.Web.Script.Serialization;
using VacancyManager.Models;
using System.IO;

namespace VacancyManager.Controllers
{
    public class InputMessageController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            var list = InputMessageManager.GetList();
            var considerationList = ConsiderationsManager.GetConsiderations();
            var applicantList = ApplicantManager.GetList();
            var vacancyList = VacancyDbManager.AllVisibleVacancies();

            List<object> result = new List<object>();
            object res;

            foreach (var message in list)
            {
                if (message.ConsiderationId != null)
                {
                    res = (from cons in considerationList
                           join app in applicantList on cons.ApplicantID equals app.ApplicantID
                           join vacancy in vacancyList on cons.VacancyID equals vacancy.VacancyID
                           where cons.ConsiderationID == message.ConsiderationId
                           select new
                           {
                               Id = message.Id,
                               Subject = message.Subject,
                               Text = message.Text,
                               IsRead = message.IsRead,
                               SendDate = message.SendDate.ToString(),
                               DeliveryDate = message.DeliveryDate.ToString(),
                               Vacancy = vacancy.Title,
                               ConsiderationId = message.ConsiderationId,
                               Sender = String.Format("{0} ({1})", app.FullName, app.Email)
                           }).ToList()[0];
                    result.Add(res);
                }
                else
                {
                    res = new
                          {
                              Id = message.Id,
                              Subject = message.Subject,
                              Text = message.Text,
                              IsRead = message.IsRead,
                              SendDate = message.SendDate.ToString(),
                              DeliveryDate = message.DeliveryDate.ToString(),
                              Vacancy = "",
                              ConsiderationId = message.ConsiderationId,
                              Sender = "email@example.ru"
                          };
                    result.Add(res);
                }
            }

            return Json(new
            {
                success = true,
                data = result
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Create(string data)
        {
            bool success = false;
            string resultMessage = "Ошибка при добавлении сообщения";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            List<InputMessage> created = new List<InputMessage>();

            if (data != null)
            {
                var obj = jss.Deserialize<dynamic>(data);

                Nullable<int> considerationId = 0;
                DateTime deliveryDate = new DateTime();
                DateTime sendDate = new DateTime();

                if (obj["ConsiderationId"].ToString() == "")
                    considerationId = null;
                else
                    considerationId = obj["ConsiderationId"];

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

                InputMessageManager.Create(obj["Sender"], obj["Subject"], obj["Text"], sendDate, deliveryDate, considerationId);                
                resultMessage = "Сообщение успешно добавлено";
                success = true;
            }

            return Json(new
            {
                success = success,
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
                InputMessageManager.Update(obj["Id"], obj["IsRead"]);
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

            string httpData = new StreamReader(HttpContext.Request.InputStream).ReadToEnd();

            if (data != null)
            {
                var obj = jss.Deserialize<dynamic>(data);
                InputMessageManager.Delete(obj["Id"]);
                resultMessage = "Сообщение успешно удалено";
                success = true;
            }

            return Json(new
            {
                success = success,
                message = resultMessage
            });
        }
    }
}
