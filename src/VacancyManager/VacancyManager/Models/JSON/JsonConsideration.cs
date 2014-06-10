using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VacancyManager.Services.Managers;
using VacancyManager.Models;

namespace VacancyManager.Models.JSON
{
    public class JsonConsideration
    {
        public int ApplicantID { get; set; }
        public int ConsiderationID { get; set; }
        public int VacancyID { get; set; }
        public string FullName { get; set; }
        public int ConsiderationStatusId { get; set; }
        public string Status { get; set; }
        public string LastCommentBody { get; set; }
        public int CommentsCount { get; set; }
        public string Email { get; set; }
        public string Vacancy { get; set; }

        public JsonConsideration()
        {
            ApplicantID = 0;
            ConsiderationID = 0;
            VacancyID = 0;
            FullName = "";
            ConsiderationStatusId = 0;
            Status = "";
            LastCommentBody = "";
            CommentsCount = 0;
            Vacancy = "";
        }

        public Tuple<string, bool> AddToConsiderationsStore()
        {   
            Tuple<string, bool> CreationStatus = new Tuple<string, bool>("Заявка соискателя успешно добавлена", true);
            Consideration NewConsideration = ConsiderationsManager.CreateConsideration(VacancyID, ApplicantID);
            ConsiderationID = NewConsideration.ConsiderationID;
            Status = NewConsideration.ConsiderationStatus.Status;
            return CreationStatus;
        }

        public Tuple<string, bool>UpdateInConsiderationsStore()
        {
            Tuple<string, bool> UpdateStatus = new Tuple<string, bool>("Заявка соискателя успешно обновлена", true);
            Consideration UpdatedConsideration = ConsiderationsManager.UpdateConsideration(ConsiderationID, ConsiderationStatusId);
            Status = UpdatedConsideration.ConsiderationStatus.Status;
            CommentsCount = UpdatedConsideration.Comments.Count;
            LastCommentBody = UpdatedConsideration.Comments.DefaultIfEmpty(new Comment()).Last().Body;
            return UpdateStatus;
        }

        public Tuple<string, bool> DeleteFromConsiderationsStore()
        {
            Tuple<string, bool> DeleteStatus = new Tuple<string, bool>("Заявка соискателя успешно удалена", true);
            ConsiderationsManager.DeleteConsideration(ConsiderationID);
            return DeleteStatus;
        }

    }
}