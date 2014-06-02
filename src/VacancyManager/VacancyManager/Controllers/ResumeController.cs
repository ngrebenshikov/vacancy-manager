using System;
using System.Linq;
using System.Web.Mvc;
using System.Text;
using VacancyManager.Models;
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

            bool CanExecuteAction = UserCanExecuteAction;
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
                    CreatedResume = ResumeManager.CreateResume(origResume.ApplicantID, origResume.Position, origResume.Summary, origResume.Training, origResume.Date, origResume.AdditionalInformation);
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
            string resumeLanq = "";
            string LogoImage = Server.MapPath(SysConfigManager.GetStringParameter("Resume Image", "~/Content/lanitlogo.png"));
            var curResume = ResumeManager.GetResume(id);
            Applicant appl = curResume.Applicant;
            Document document = new Document(PageSize.A4, 50, 50, 25, 25);
            var output = new MemoryStream();
            var writer = PdfWriter.GetInstance(document, output);
            var ReqStacks = RequirementsManager.GetAllRequirementStacks();
            var Reqs = RequirementsManager.GetRequirements();
            resumeLanq = Helper.CheckLanq(curResume.Position);

            bool CanExecuteAction = UserCanExecuteAction;
            if (!CanExecuteAction)
            {
                CanExecuteAction = ApplicantManager.IsValidApplicant(curResume.ApplicantID, User.Identity.Name);
            }
            if (CanExecuteAction)
            {
                Helper.PdfResumeHeaders curResumeHeaders = new Helper.PdfResumeHeaders(resumeLanq);

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
                var curResumeReqs = curResume.ResumeRequirements;
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
                if (resumeLanq == "ru")
                    document.Add(new Paragraph(appl.FullName, FioFont) { SpacingAfter = 5 });
                else
                    document.Add(new Paragraph(appl.FullNameEn, FioFont) { SpacingAfter = 5 });

                document.Add(new Paragraph(curResumeHeaders.Position + "\n", subTitleFont) { SpacingAfter = 5 });
                document.Add(new Paragraph(curResume.Position + "\n", baseFont) { SpacingAfter = 5 });
                document.Add(new Paragraph(curResumeHeaders.Summary + "\n", subTitleFont) { SpacingAfter = 5 });
                document.Add(new Paragraph(curResume.Summary + "\n", baseFont) { SpacingAfter = 5 });
                document.Add(new Paragraph(curResumeHeaders.Competency + "\n", subTitleFont) { SpacingAfter = 5 });
                document.Add(new Paragraph(curResumeHeaders.Technologies + "\n", subTitleFont) { SpacingAfter = 5 });

                #endregion

                #region Resume Requirements

                var curResumeReqsStacks = (from w in curResumeReqs
                                           join v in ReqsWStacks on w.RequirementId equals v.ReqId
                                           where w.IsChecked == true
                                           orderby v.ReqStackName descending
                                           group new { v.ReqName, v.ReqNameEn, w.Comment } by new { ReqStackName = (resumeLanq == "ru" ? v.ReqStackName : v.ReqStackNameEn) }.ReqStackName into newGroup
                                           select newGroup

                );

                foreach (var nameGroup in curResumeReqsStacks)
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
                            if (resumeLanq == "ru")
                            { key.Append(stack.ReqName + " - " + stack.Comment + s); }
                            else
                            { key.Append(stack.ReqNameEn + " - " + stack.Comment + s); }
                        }
                        else
                        {
                            if (resumeLanq == "ru")
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
                var resumeProfExps = (from profexp in curResume.Experiences
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
                                                     select new
                                                     {
                                                         ReqName = (resumeLanq == "ru" ? v.ReqName : v.ReqNameEn)
                                                     }.ReqName
                                                     )
                                      }
                );

                if (resumeProfExps.Count() != 0)
                {
                    document.Add(new Paragraph(curResumeHeaders.ProfExp + "\n", subTitleFont) { SpacingAfter = 5 });
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
                            DateTimeFormatInfo dtfi = curResumeHeaders.ResumeCi.DateTimeFormat;
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
                                EndJob = curResumeHeaders.ToNow;
                            else
                            {
                                string strMonthName = dtfi.GetMonthName(resumeProfExp.FinishDate.Value.Month);
                                EndJob = strMonthName + " " + resumeProfExp.FinishDate.Value.Year;
                            }

                            JPeriod = StartJob + " - " + EndJob;
                            profexpTable.AddCell(new Phrase(JPeriod, boldTableFont));
                            profexpTable.AddCell(new Phrase(resumeProfExp.Job, bodyFontBold));
                            profexpTable.AddCell(new Phrase(curResumeHeaders.ProfExpProject + ":", bodyFontSmall));
                            profexpTable.AddCell(new Phrase(resumeProfExp.Project, bodyFontSmall));
                            profexpTable.AddCell(new Phrase(curResumeHeaders.Position + ":", bodyFontSmall));
                            profexpTable.AddCell(new Phrase(resumeProfExp.Position, bodyFontSmall));
                            profexpTable.AddCell(new Phrase(curResumeHeaders.Duties + ":", bodyFontSmall));
                            profexpTable.AddCell(new Phrase(resumeProfExp.Duties, bodyFontSmall));
                            profexpTable.AddCell(new Phrase(curResumeHeaders.ExperienceRequirements + ":", bodyFontSmall));
                            profexpTable.AddCell(new Phrase(ExpreqAll, bodyFontSmall));
                            profexpTable.AddCell(new Phrase(" "));
                            profexpTable.AddCell(new Phrase(" "));
                        }

                        document.Add(profexpTable);
                    }
                }

                #endregion

                #region Education Experience
                var resumeEduExps = (from eduexp in curResume.Experiences
                                     where eduexp.IsEducation == true
                                     orderby eduexp.StartDate descending
                                     select eduexp);

                if (resumeEduExps != null)
                {
                    document.Add(new Paragraph(curResumeHeaders.Education + "\n", subTitleFont) { SpacingAfter = 5 });
                    foreach (var resumeEduExp in resumeEduExps)
                    {
                        string EduPeriod = "";
                        string EduEndDate = "";
                        string Edu = "";

                        if (resumeEduExp.FinishDate == null)
                            EduEndDate = curResumeHeaders.ToNow;
                        else
                            EduEndDate = resumeEduExp.FinishDate.Value.Year.ToString();
                        EduPeriod = resumeEduExp.StartDate.Year + " - " + EduEndDate + ".";

                        Edu = EduPeriod + resumeEduExp.Job + "." + resumeEduExp.Project + "." + resumeEduExp.Position + ".";

                        document.Add(new Paragraph(Edu, bodyFont) { SpacingAfter = 5 });
                    }

                }
                #endregion

                #region Additional Info
                if ((curResume.Training != "") && (curResume.Training != null))
                {
                    document.Add(new Paragraph(curResumeHeaders.CertsTraining + "\n", subTitleFont) { SpacingAfter = 5 });
                    document.Add(new Paragraph(curResume.Training, bodyFont) { SpacingAfter = 5 });
                }

                if ((curResume.AdditionalInformation != "") && (curResume.AdditionalInformation != null))
                {
                    document.Add(new Paragraph(curResumeHeaders.AdditionalInformation + "\n", subTitleFont) { SpacingAfter = 5 });
                    document.Add(new Paragraph(curResume.AdditionalInformation, bodyFont) { SpacingAfter = 5 });
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
            bool CanChangeOrViewData = UserCanExecuteAction;

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
                                  Lanquage = res.Lanquage,
                                  StartDate = res.Period,
                                  Position = res.Position,
                                  Summary = res.Summary
                              }).ToList();
            }

            return Json(new
            {
                success = true,
                data = ResumeList
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult UpdateResume(string data)
        {
            bool success = false;
            string resultMessage = "Ошибка при обновлении резюме";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            object created = null;
            Resume updateResume = new Resume();
            bool CanExecuteAction = UserCanExecuteAction;

            if (data != null)
            {
                var obj = jss.Deserialize<dynamic>(data); //

                if (!CanExecuteAction)
                {
                    CanExecuteAction = ApplicantManager.IsValidApplicant(obj["ApplicantID"], User.Identity.Name);
                }

                if (CanExecuteAction)
                {
                    updateResume = ResumeManager.UpdateResume(obj["ResumeId"], obj["Position"].ToString(), obj["Summary"].ToString(), obj["Training"].ToString(), obj["AdditionalInformation"].ToString());
                    success = true;
                    resultMessage = "Резюме успешно обновлено";
                    created = new
                    {
                        ResumeId = updateResume.ResumeId,
                        ApplicantID = updateResume.ApplicantID,
                        Date = updateResume.Date.ToShortDateString(),
                        Training = updateResume.Training,
                        AdditionalInformation = updateResume.AdditionalInformation,
                        StartDate = updateResume.Period,
                        Position = updateResume.Position,
                        Summary = updateResume.Summary
                    };
                }
            }

            return Json(new
            {
                success = success,
                data = created,
                message = resultMessage
            });
        }

        [HttpPost]
        public ActionResult DeleteResume(string data) //(int id)
        {
            bool success = false;
            string resultMessage = "Ошибка при удалении резюме";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            bool CanExecuteAction = UserCanExecuteAction;
            if (data != null)    //(id != null)
            {
                var obj = jss.Deserialize<dynamic>(data); //
                if (!CanExecuteAction)
                {
                    CanExecuteAction = ApplicantManager.IsValidApplicant(Convert.ToUInt32(obj["ApplicantID"]), User.Identity.Name);
                }
                if (CanExecuteAction)
                {
                    
                    ResumeManager.DeleteResume(obj["ResumeId"]);  //ResumeManager.DeleteResume(id);
                    resultMessage = "Резюме Удалено";
                    success = true;
                }
            }

            return Json(new
            {
                success = success,
                message = resultMessage
            });
        }

        [HttpPost]
        public ActionResult CreateResume(string data)
        {
            bool success = false;
            string resultMessage = "Ошибка при добавлении резюме";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            object created = null;
            Resume createResume = new Resume();
            bool CanExecuteAction = UserCanExecuteAction;
            if (data != null)
            {
                var obj = jss.Deserialize<dynamic>(data);
                int AppId = Convert.ToInt32(obj["ApplicantID"]);
              
                if (!CanExecuteAction)
                {
                    CanExecuteAction = ApplicantManager.IsValidApplicant(AppId, User.Identity.Name);
                }
              
                if (CanExecuteAction)
                {
                    createResume = ResumeManager.CreateResume(AppId, obj["Position"].ToString(), obj["Summary"].ToString(), obj["Training"].ToString(), DateTime.Now, obj["AdditionalInformation"].ToString());

                    resultMessage = "Резюме добавлено";
                    success = true;
                    
                    created = new
                    {
                        ResumeId = createResume.ResumeId,
                        ApplicantID = createResume.ApplicantID,
                        Date = createResume.Date.ToShortDateString(),
                        Training = createResume.Training,
                        AdditionalInformation = createResume.AdditionalInformation,
                        StartDate = createResume.Period,
                        Position = createResume.Position,
                        Summary = createResume.Summary
                    };
                }
            }

            return Json(new
            {
                success = success,
                data = created,
                message = resultMessage
            });

        }


    }
}
