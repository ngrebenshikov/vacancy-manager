using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Applican.Models;

namespace Vacan.Controllers
{
  public class ApplicantController : Controller
  {
    public ApplicantDbContext db = new ApplicantDbContext();

    //
    // GET: /Applicant/

    public ViewResult Index()
    {
      return View(db.Applicants.ToList());
    }

    //
    // GET: /Applicant/Details/5

    public ViewResult Details(int id)
    {
      Applicant applicant = db.Applicants.Find(id);
      return View(applicant);
    }

    //
    // GET: /Applicant/Create

    public ActionResult Create()
    {
      return View();
    }

    //
    // POST: /Applicant/Create

    [HttpPost]
    public ActionResult Create(Applicant applicant)
    {
      if (ModelState.IsValid)
      {
        /*foreach (string file in Request.Files)
        {
          HttpPostedFileBase fileConf = Request.Files[file] as HttpPostedFileBase;
          string filename = Path.GetFileName(fileConf.FileName);
          if (filename != null)
            fileConf.SaveAs(Path.Combine(AppDomain.CurrentDomain.BaseDirectory + "UploadedFiles/", filename));
          //applicant.FileName = Path.Combine(AppDomain.CurrentDomain.BaseDirectory + "UploadedFiles/", filename);
          applicant.FileName = "Q";
        }*/
        db.Applicants.Add(applicant);
        db.SaveChanges();
        return RedirectToAction("UploadSummary/" + applicant.ID.ToString());
      }
      return RedirectToAction("Index");
    }

    //
    // GET: /Applicant/Edit/5

    public ActionResult Edit(int id)
    {
      Applicant applicant = db.Applicants.Find(id);
      return View(applicant);
    }

    //
    // POST: /Applicant/Edit/5

    [HttpPost]
    public ActionResult Edit(Applicant applicant)
    {
      if (ModelState.IsValid)
      {
        db.Entry(applicant).State = EntityState.Modified;
        db.SaveChanges();
        return RedirectToAction("Index");
      }
      return View(applicant);
    }

    //
    // GET: /Applicant/Delete/5

    public ActionResult Delete(int id)
    {
      Applicant applicant = db.Applicants.Find(id);
      return View(applicant);
    }

    //
    // POST: /Applicant/Delete/5

    [HttpPost, ActionName("Delete")]
    public ActionResult DeleteConfirmed(int id)
    {
      Applicant applicant = db.Applicants.Find(id);
      db.Applicants.Remove(applicant);
      db.SaveChanges();
      return RedirectToAction("Index");
    }

    protected override void Dispose(bool disposing)
    {
      db.Dispose();
      base.Dispose(disposing);
    }

    public ActionResult UploadSummary(int id)
    {
      ViewBag.ID = id;
      return View();
    }

    [HttpPost]
    public ActionResult UploadSummary(IEnumerable<HttpPostedFileBase> fileUpload)
    {
      string path = Server.MapPath("~/App_Data/UploadedFiles");
      db.Applicants.Find(Int32.Parse(Request.Params["ID"])).FileName = "";
      foreach (var file in fileUpload)
      {
        if (file == null)
          continue;
        Applicant applicant = db.Applicants.Find(Int32.Parse(Request.Params["ID"]));
        string extension=Path.GetExtension(file.FileName);
        if ((!extension.Equals(".doc",StringComparison.InvariantCultureIgnoreCase)) & (!extension.Equals(".docx",StringComparison.InvariantCultureIgnoreCase)))
          continue;
        string filename = (applicant.FirstName.GetHashCode().ToString() + applicant.SecondName.GetHashCode().ToString() +
          applicant.MiddleName.GetHashCode().ToString() + applicant.EMail.GetHashCode().ToString()).GetHashCode().ToString() + extension;
        db.Applicants.Find(Int32.Parse(Request.Params["ID"])).FileName = filename;
        if (filename != null)
          file.SaveAs(Path.Combine(path, filename));
      }
      db.SaveChanges();
      return RedirectToAction("Index");
    }

    public void DownloadSummary(int id)
    {
      ViewBag.ID = id;
      if (db.Applicants.Find(id).FileName != "")
      {
        string fileName =  db.Applicants.Find(id).FileName;
            byte[] buffer;

            using (FileStream fileStream = new FileStream(Server.MapPath("~/App_Data/UploadedFiles/")+fileName, FileMode.Open))
            {
                int fileSize = (int)fileStream.Length;
                buffer = new byte[fileSize];
                // Read file into buffer
                fileStream.Read(buffer, 0, (int)fileSize);
            }
            Response.Clear();
            Response.Buffer = true;
            Response.BufferOutput = true;
            Response.ContentType = "application/x-download";
            Response.AddHeader("Content-Disposition", "attachment; filename=" + fileName);
            Response.CacheControl = "public";
            // writes buffer to OutputStream
            Response.OutputStream.Write(buffer, 0, buffer.Length);
            Response.End();
      }
    }
  }
}