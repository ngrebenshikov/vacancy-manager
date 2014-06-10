using System;
using System.Linq;
using System.Web.Mvc;
using System.Text;
using VacancyManager.Models;
using VacancyManager.Models.JSON;
using VacancyManager.Services.Managers;
using System.Web.Script.Serialization;
using VacancyManager.Services;
using System.Web.Security;
using System.IO;
using VacancyManager.Properties;
using System.Collections.Generic;
using System.Globalization;
using iTextSharp.text;
using iTextSharp.text.pdf;


namespace VacancyManager.Controllers
{
    public class ResumeController : UserController
    {

        #region CreateResumeCopy
        [HttpGet]
        public ActionResult CreateResumeCopy(int? id)
        {
            bool success = true;
            int createdResumeId = 0;
            Resume CreatedResume = new Resume();
            object created = null;
            var origResume = ResumeManager.GetResume(id);

            bool CanExecuteAction = isAdminAccess;
            if (!CanExecuteAction)
            {
                CanExecuteAction = ApplicantManager.IsValidApplicant(origResume.ApplicantID, User.Identity.Name);
            }

            if (CanExecuteAction)
            {
                ICollection<ResumeRequirement> origResumeReqs = origResume.ResumeRequirements;
                ICollection<Experience> origResumeExps = origResume.Experiences;

                if (origResume != null)
                {
                    CreatedResume = ResumeManager.CreateResumeCopy(origResume);
                    createdResumeId = CreatedResume.ResumeId;
                    foreach (var origResumeReq in origResumeReqs)
                    {
                        ResumeManager.CreateResumeRequirement(createdResumeId, origResumeReq.RequirementId, origResumeReq.Comment, origResumeReq.IsChecked);
                    }

                    foreach (var origResumeExp in origResumeExps)
                    {
                        int ResumeExperienceId = 0;
                        ICollection<ExperienceRequirement> origResumeExpReqs = origResumeExp.ExperienceRequirements;
                        DateTime? finishdate = null;
                        if (origResumeExp.FinishDate.HasValue)
                            finishdate = origResumeExp.FinishDate;
                        ResumeExperienceId = ResumeManager.CreateResumeExperience(createdResumeId, origResumeExp.Duties, finishdate, origResumeExp.IsEducation, origResumeExp.Job, origResumeExp.Position, origResumeExp.Project, origResumeExp.StartDate).ExperienceId;
                        foreach (var origResumeExpReq in origResumeExpReqs)
                        {
                            ResumeManager.CreateExperienceRequirement(ResumeExperienceId, origResumeExpReq.RequirementId, origResumeExpReq.Comment, origResumeExpReq.IsChecked);
                        }
                    }

                }

                created = new
                {
                    ResumeId = CreatedResume.ResumeId,
                    ApplicantID = CreatedResume.ApplicantID,
                    Date = CreatedResume.Date.ToShortDateString(),
                    Training = CreatedResume.Training,
                    AdditionalInformation = CreatedResume.AdditionalInformation,
                    StartDate = CreatedResume.Period,
                    LanquageID = CreatedResume.LanquageID,
                    Position = CreatedResume.Position,
                    Summary = CreatedResume.Summary
                };

            }

            return Json(new
            {
                success = success,
                resume = created
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult CreatePdfCopy(int? id)
        {
           
            string LogoImage = Server.MapPath(SysConfigManager.GetStringParameter("Resume Image", "~/Content/lanitlogo.png"));
            var CurResume = ResumeManager.GetResume(id);
            int ResumeLanquage = CurResume.LanquageID;
            Applicant appl = CurResume.Applicant;
            Document document = new Document(PageSize.A4, 50, 50, 25, 25);
            var output = new MemoryStream();
            var writer = PdfWriter.GetInstance(document, output);
            var ReqStacks = RequirementsManager.GetAllRequirementStacks();
            var Reqs = RequirementsManager.GetRequirements();

            bool CanExecuteAction = isAdminAccess;
            if (!CanExecuteAction)
            {
                CanExecuteAction = ApplicantManager.IsValidApplicant(CurResume.ApplicantID, User.Identity.Name);
            }
            if (CanExecuteAction)
            {
                Helper.PdfResumeHeaders CurResumeHeaders = new Helper.PdfResumeHeaders(ResumeLanquage);

                var ReqsWStacks = (from req in Reqs
                                   join v in ReqStacks on req.RequirementStackID equals v.RequirementStackID
                                   select new
                                   {
                                       ReqStackId = v.RequirementStackID,
                                       ReqStackName = v.Name,
                                       ReqStackNameEn = v.NameEn,
                                       ReqName = req.Name,
                                       ReqNameEn = req.NameEn,
                                       ReqId = req.RequirementID
                                   });
                document.Open();
                var curResumeReqs = CurResume.ResumeRequirements;
                if (System.IO.File.Exists(LogoImage))
                {
                    iTextSharp.text.Image imgLogo = iTextSharp.text.Image.GetInstance(LogoImage);
                    imgLogo.SetAbsolutePosition(10, 760);
                    imgLogo.ScalePercent(40f); // change it's size
        

                document.Add(imgLogo);
                }
                document.Add(new Paragraph("\n\n\n"));

                #region Report Options
                BaseFont fnt = BaseFont.CreateFont(@"C:\Windows\Fonts\Arial.ttf", Encoding.GetEncoding(1251).BodyName, true);
                var titleFont = new Font(fnt, 18, Font.BOLD);
                var FioFont = new Font(fnt, 16, Font.BOLD);
                var subTitleFont = new Font(fnt, 14, Font.BOLD);
                var baseFont = new Font(fnt, 11, Font.NORMAL);
                var baseFontUndl = new Font(fnt, 11, Font.UNDERLINE | Font.BOLD);
                var boldTableFont = new Font(fnt, 12, Font.BOLD);
                var endingMessageFont = new Font(fnt, 10, Font.ITALIC);
                var bodyFont = new Font(fnt, 11, Font.NORMAL);
                var bodyFontBold = new Font(fnt, 11, Font.BOLD);
                var bodyFontSmall = new Font(fnt, 10, Font.NORMAL);

                #endregion

                #region Applicant Info
                if (ResumeLanquage == 1)
                    document.Add(new Paragraph(appl.FullName, FioFont) { SpacingAfter = 5 });
                else
                    document.Add(new Paragraph(appl.FullNameEn, FioFont) { SpacingAfter = 5 });

                document.Add(new Paragraph(CurResumeHeaders.Position + "\n", subTitleFont) { SpacingAfter = 5 });
                document.Add(new Paragraph(CurResume.Position + "\n", baseFont) { SpacingAfter = 5 });
                document.Add(new Paragraph(CurResumeHeaders.Summary + "\n", subTitleFont) { SpacingAfter = 5 });
                document.Add(new Paragraph(CurResume.Summary + "\n", baseFont) { SpacingAfter = 5 });
                document.Add(new Paragraph(CurResumeHeaders.Competency + "\n", subTitleFont) { SpacingAfter = 5 });
                document.Add(new Paragraph(CurResumeHeaders.Technologies + "\n", subTitleFont) { SpacingAfter = 5 });

                #endregion

                #region Resume Requirements

                var CurResumeReqsStacks = (from w in curResumeReqs
                                           join v in ReqsWStacks on w.RequirementId equals v.ReqId
                                           where w.IsChecked == true
                                           orderby v.ReqStackName descending
                                           group new { v.ReqName, v.ReqNameEn, w.Comment } by new { ReqStackName = (ResumeLanquage == 1 ? v.ReqStackName : v.ReqStackNameEn) }.ReqStackName into newGroup
                                           select newGroup

                );

                foreach (var nameGroup in CurResumeReqsStacks)
                {
                    int i = 0;
                    string s = "";
                    int stcount = nameGroup.Count() - 1;
                    Paragraph parh = new Paragraph();
                    parh.SpacingAfter = 5;
                    Phrase p2 = new Phrase();
                    Chunk key = new Chunk(nameGroup.Key + ": ", baseFontUndl);
                    foreach (var stack in nameGroup)
                    {
                        if (i != stcount)
                            s = ", ";
                        else
                            s = "";

                        //  Chunk ch = new Chunk();

                        key.Font = baseFont;

                        if ((stack.Comment != "") && (stack.Comment != null))
                        {
                            if (ResumeLanquage == 1)
                            { key.Append(stack.ReqName + " - " + stack.Comment + s); }
                            else
                            { key.Append(stack.ReqNameEn + " - " + stack.Comment + s); }
                        }
                        else
                        {
                            if (ResumeLanquage == 1)
                                key.Append(stack.ReqName + s);
                            else
                                key.Append(stack.ReqNameEn + s);
                        }
                        i++;
                    }
                    p2.Add(key);
                    parh.Add(p2);
                    document.Add(parh);
                }
                #endregion

                #region Professional Experience
                var resumeProfExps = (from profexp in CurResume.Experiences
                                      where profexp.IsEducation == false
                                      orderby profexp.StartDate descending
                                      select new
                                      {
                                          StartDate = profexp.StartDate,
                                          FinishDate = profexp.FinishDate,
                                          Job = profexp.Job,
                                          Duties = profexp.Duties,
                                          Project = profexp.Project,
                                          Position = profexp.Position,
                                          ExpReqs = (from p in profexp.ExperienceRequirements
                                                     join v in ReqsWStacks on p.RequirementId equals v.ReqId
                                                     where p.IsChecked == true
                                                     select new { ReqName = (ResumeLanquage == 1 ? v.ReqName : v.ReqNameEn) }.ReqName)
                                      });
                if (resumeProfExps.Count() != 0)
                {
                    document.Add(new Paragraph(CurResumeHeaders.ProfExp + "\n", subTitleFont) { SpacingAfter = 5 });
                    var profexpTable = new PdfPTable(2);
                    profexpTable.WidthPercentage = 100;
                    profexpTable.HorizontalAlignment = 0;
                    profexpTable.SpacingBefore = 10;
                    profexpTable.SpacingAfter = 10;
                    profexpTable.DefaultCell.Border = 0;
                    profexpTable.SetWidths(new int[] { 30, 70 });

                    if (resumeProfExps != null)
                    {
                        foreach (var resumeProfExp in resumeProfExps)
                        {
                            string StartJob = "";
                            string EndJob = "";
                            string JPeriod = "";
                            string ExpreqAll = "";
                            int expreqC = 0;
                            DateTimeFormatInfo dtfi = CurResumeHeaders.ResumeCi.DateTimeFormat;
                            var ExpReqs = resumeProfExp.ExpReqs.ToArray<string>();
                            StartJob = dtfi.GetMonthName(resumeProfExp.StartDate.Month) + " " + resumeProfExp.StartDate.Year;
                            expreqC = ExpReqs.Count();
                            for (int j = 0; j < expreqC; j++)
                            {
                                string s1 = "";

                                if (j == expreqC - 1)
                                    s1 = "";
                                else
                                    s1 = ", ";

                                ExpreqAll = ExpreqAll + ExpReqs[j] + s1;
                            }

                            if (resumeProfExp.FinishDate == null)
                                EndJob = CurResumeHeaders.ToNow;
                            else
                            {
                                string strMonthName = dtfi.GetMonthName(resumeProfExp.FinishDate.Value.Month);
                                EndJob = strMonthName + " " + resumeProfExp.FinishDate.Value.Year;
                            }

                            JPeriod = StartJob + " - " + EndJob;
                            profexpTable.AddCell(new Phrase(JPeriod, boldTableFont));
                            profexpTable.AddCell(new Phrase(resumeProfExp.Job, bodyFontBold));
                            profexpTable.AddCell(new Phrase(CurResumeHeaders.ProfExpProject + ":", bodyFontSmall));
                            profexpTable.AddCell(new Phrase(resumeProfExp.Project, bodyFontSmall));
                            profexpTable.AddCell(new Phrase(CurResumeHeaders.Position + ":", bodyFontSmall));
                            profexpTable.AddCell(new Phrase(resumeProfExp.Position, bodyFontSmall));
                            profexpTable.AddCell(new Phrase(CurResumeHeaders.Duties + ":", bodyFontSmall));
                            profexpTable.AddCell(new Phrase(resumeProfExp.Duties, bodyFontSmall));
                            profexpTable.AddCell(new Phrase(CurResumeHeaders.ExperienceRequirements + ":", bodyFontSmall));
                            profexpTable.AddCell(new Phrase(ExpreqAll, bodyFontSmall));
                            profexpTable.AddCell(new Phrase(" "));
                            profexpTable.AddCell(new Phrase(" "));
                        }

                        document.Add(profexpTable);
                    }
                }

                #endregion

                #region Education Experience
                var resumeEduExps = (from eduexp in CurResume.Experiences
                                     where eduexp.IsEducation == true
                                     orderby eduexp.StartDate descending
                                     select eduexp);

                if (resumeEduExps != null)
                {
                    document.Add(new Paragraph(CurResumeHeaders.Education + "\n", subTitleFont) { SpacingAfter = 5 });
                    foreach (var resumeEduExp in resumeEduExps)
                    {
                        string EduPeriod = "";
                        string EduEndDate = "";
                        string Edu = "";

                        if (resumeEduExp.FinishDate == null)
                            EduEndDate = CurResumeHeaders.ToNow;
                        else
                            EduEndDate = resumeEduExp.FinishDate.Value.Year.ToString();
                        EduPeriod = resumeEduExp.StartDate.Year + " - " + EduEndDate + ".";

                        Edu = EduPeriod + resumeEduExp.Job + "." + resumeEduExp.Project + "." + resumeEduExp.Position + ".";

                        document.Add(new Paragraph(Edu, bodyFont) { SpacingAfter = 5 });
                    }

                }
                #endregion

                #region Additional Info
                if ((CurResume.Training != "") && (CurResume.Training != null))
                {
                    document.Add(new Paragraph(CurResumeHeaders.CertsTraining + "\n", subTitleFont) { SpacingAfter = 5 });
                    document.Add(new Paragraph(CurResume.Training, bodyFont) { SpacingAfter = 5 });
                }

                if ((CurResume.AdditionalInformation != "") && (CurResume.AdditionalInformation != null))
                {
                    document.Add(new Paragraph(CurResumeHeaders.AdditionalInformation + "\n", subTitleFont) { SpacingAfter = 5 });
                    document.Add(new Paragraph(CurResume.AdditionalInformation, bodyFont) { SpacingAfter = 5 });
                }
                #endregion

                document.Close();
            }

            var newResume = output.ToArray();

            return File(newResume, "application/pdf");
        }
        #endregion

        [HttpGet]
        public ActionResult LoadResume(int appId)
        {
            IEnumerable<Resume> Resume = null;
            IEnumerable<object> ResumeList = null;
            bool CanChangeOrViewData = isAdminAccess;

            if (!CanChangeOrViewData)
            {
                CanChangeOrViewData = ApplicantManager.IsValidApplicant(appId, User.Identity.Name);
            }

            if (CanChangeOrViewData)
            {
                Resume = ResumeManager.GetResumes(appId);
                ResumeList = (from res in Resume
                              select new
                              {
                                  ResumeId = res.ResumeId,
                                  ApplicantID = res.ApplicantID,
                                  Date = res.Date.ToShortDateString(),
                                  Training = res.Training,
                                  AdditionalInformation = res.AdditionalInformation,
                                  LanquageID = res.LanquageID,
                                  StatusID = res.StatusID,
                                  StartDate = res.Period,
                                  Position = res.Position,
                                  Summary = res.Summary
                              });
            }

            return Json(new
            {
                success = true,
                data = ResumeList
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult UpdateResume(JsonResume resume)
        {
            bool Success = false;
            string ActiveUser = User.Identity.Name;
            string ResultMessage = "Ошибка при обновлении резюме";
            bool CanEditResume = isAdminAccess == false ? ResumeManager.CheckResumePermissions(resume, ActiveUser): true;
            if (resume != null)
            {
                if (CanEditResume)
                {
                    Tuple<string, bool> UpdateStatus = resume.UpdateInResumeStore();
                    Success = UpdateStatus.Item2;
                    ResultMessage = UpdateStatus.Item1;
                }
            }
            return Json(new { success = Success, data = resume,  message = ResultMessage });
        }

        [HttpPost]
        public ActionResult DeleteResume(JsonResume resume) //(int id)
        {
            bool Success = false;
            string ResultMessage = "Ошибка при удалении резюме";
            bool CanExecuteAction = isAdminAccess;
            if (resume != null)    //(id != null)
            {
                if (!CanExecuteAction) { CanExecuteAction = ApplicantManager.IsValidApplicant(resume.ApplicantID, User.Identity.Name); }
                if (CanExecuteAction)
                {
                    Tuple<string, bool> DeleteStatus = resume.DeleteFromResumeStore();
                    Success = DeleteStatus.Item2;
                    ResultMessage = DeleteStatus.Item1;
                }
            }
            return Json(new  { success = Success,  message = ResultMessage });
        }

        [HttpPost]
        public ActionResult CreateResume(JsonResume resume)
        {
            bool Success = false;
            string ResultMessage = "Ошибка при добавлении резюме";
            bool CanExecuteAction = isAdminAccess;
            if (resume != null)
            {
                int AppId = resume.ApplicantID;           
                if (!CanExecuteAction)
                { CanExecuteAction = ApplicantManager.IsValidApplicant(AppId, User.Identity.Name); }         
                if (CanExecuteAction)
                {
                    Tuple<string, bool> CreationStatus = resume.AddToResumeStore();
                    ResultMessage = CreationStatus.Item1;
                    Success = CreationStatus.Item2;            
               }
            }
            return Json(new { success = Success,  data = resume,  message = ResultMessage });
        }


    }
}
