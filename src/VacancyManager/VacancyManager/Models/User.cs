using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    /// <summary>
    /// Класс, описывающий сущность пользователя
    /// </summary>
    public class User
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }
        public string PasswordSalt { get; set; }
        public string UserComment { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime LaslLoginDate { get; set; }
        public bool IsActivated { get; set; }
        public bool IsLockedOut { get; set; }
        public DateTime LastLockedOutDate { get; set; }
        public string LastLockedOutReason { get; set; }

        [DataType(DataType.EmailAddress)]
        public string EmailKey { get; set; }

        public virtual ICollection<Role> Roles { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Resume> Resumes { get; set; }
        public virtual ICollection<Consideration> Considerations { get; set; }
        public virtual ICollection<File> Files { get; set; } 
    }
}