using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Web.Script.Serialization;
using System.Text;
using VacancyManager.Services.Managers;

namespace VacancyManager.Controllers
{
    public class AttachmentController : Controller
    {
        [HttpGet]
        public ActionResult Index(int id)
        {
            var list = AttachmentManager.GetList(id);
            object obj = new object();

            if (list != null)
            {
                obj = (from att in list
                       select new
                       {
                           Id = att.Id,
                           FileName = att.FileName,
                           ContentType = att.ContentType,
                           InputMessageId = id
                       }).ToList();
            }

            return Json(new
            {
                success = true,
                data = obj
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult UploadFile()
        {
            bool success = false;
            string resultMessage = "Ошибка при добавлении вложения";

            if (HttpContext.Request.InputStream != null)
            {
                AntsCode.Util.MultipartParser parser = new AntsCode.Util.MultipartParser(HttpContext.Request.InputStream);

                if (parser.Success)
                {
                    AttachmentManager.Create(parser.ContentType, parser.FileContent, parser.FileName, 2);
                    success = true;
                    resultMessage = "Вложение добавлено";
                }
            }

            #region для теста
            //var list = AttachmentManager.GetList(18);
            //if (list != null)
            //{
            //    var obj = (from att in list
            //               select new
            //               {
            //                   ContentType = att.ContentType,
            //                   FileName = att.FileName,
            //                   FileContent = att.FileContent
            //               }).ToList();

            //    System.IO.File.WriteAllBytes(@"C:\Users\alexei\Desktop\out\" + obj[obj.Count - 1].FileName, obj[obj.Count - 1].FileContent);
            //}
            #endregion

            return Json(new
            {
                success = success,
                message = resultMessage
            });
        }
    }
}
