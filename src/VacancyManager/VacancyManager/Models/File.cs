﻿namespace VacancyManager.Models
{
    public class File
    {
        public int FileID { get; set; }

        // TODO Уточнить способ хранения файлов

        public virtual User User { get; set; }
    }
}