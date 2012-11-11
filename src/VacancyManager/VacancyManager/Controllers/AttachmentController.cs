using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Web.Script.Serialization;
using System.Text;

namespace VacancyManager.Controllers
{
    public class AttachmentController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult UploadFile()
        {
            string data = new StreamReader(HttpContext.Request.InputStream).ReadToEnd();

           
            // "------WebKitFormBoundaryKMabHWgDZsdSm2Gi\r\nContent-Disposition: form-data; name=\"AttachmentFile\"; 
            // filename=\"11.txt\"\r\nContent-Type: text/plain\r\n\r\n123\r\n------WebKitFormBoundaryKMabHWgDZsdSm2Gi--\r\n"

            return null;
        }
    }
}
