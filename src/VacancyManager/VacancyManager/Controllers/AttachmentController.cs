using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.IO;
using System.Web.Script.Serialization;
using System.Text;
using VacancyManager.Services.Managers;
using VacancyManager.Services;

namespace VacancyManager.Controllers
{
    [AuthorizeError(Roles = "Admin")]
    public class AttachmentController : BaseController
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
                           FileSize = att.FileContent.Length > 1024 ? att.FileContent.Length / 1024 : att.FileContent.Length,
                           Icon = Helper.MimeIcons(att.ContentType),
                           ContentType = att.ContentType
                       }).ToList();
            }

            return Json(new
            {
                success = true,
                data = obj
            }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Upload(string id)
        {
            bool success = false;
            string resultMessage = "Ошибка при добавлении вложения";

            HttpContext.Request.InputStream.Seek(0, SeekOrigin.Begin);
            AntsCode.Util.MultipartParser parser = new AntsCode.Util.MultipartParser(HttpContext.Request.InputStream);

            if (parser.Success)
            {
                if (!String.IsNullOrWhiteSpace(parser.FileName))
                {
                    AttachmentManager.Create(parser.ContentType, parser.FileContent, parser.FileName, int.Parse(id));
                    success = true;
                    resultMessage = "Вложение добавлено";
                }
                else
                {
                    success = true;
                    resultMessage = "Не выбран файл";
                }
            }

            return Json(new
            {
                success = success,
                message = resultMessage
            });
        }

        public ActionResult Download(int id)
        {
            var obj = AttachmentManager.Get(id);

            var cd = new System.Net.Mime.ContentDisposition
            {
                FileName = obj.FileName,
                Inline = true
            };

            Response.AppendHeader("Content-Disposition", cd.ToString());
            return File(obj.FileContent, obj.ContentType);
        }
    }
}
