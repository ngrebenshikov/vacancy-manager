using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using VacancyManager.Services;
using VacancyManager.Services.Managers;
using System.Web.Script.Serialization;
using VacancyManager.Models;
using System.IO;

namespace VacancyManager.Controllers
{
  [AuthorizeError(Roles = "Admin")]
  public class InputMessageController : BaseController
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
                   Sender = String.Format("{0} ({1})", cons.Applicant.FullName, cons.Applicant.Email)
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
                  Sender = message.Sender
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
      InputMessage created = new InputMessage();

      if (data != null)
      {
        var obj = jss.Deserialize<dynamic>(data);

        Nullable<int> considerationId = 0;
        DateTime deliveryDate = new DateTime();
        DateTime sendDate = new DateTime();

        if (String.IsNullOrWhiteSpace(obj["ConsiderationId"].ToString()))
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

        created = InputMessageManager.Create(obj["Sender"], obj["Subject"], obj["Text"], sendDate, deliveryDate, considerationId);
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
            InputMessageManager.Delete(q["Id"]);
          }
          resultMessage = "Сообщение успешно удалено";
          success = true;
        }
      }
      else
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

    public ActionResult UpdateMailsListFromIMAP()
    {
      InputMessageManager.UpdateMailsListFromIMAP();
      return null;
    }
  }
}
