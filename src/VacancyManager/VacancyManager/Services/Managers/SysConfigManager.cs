using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{
    internal static class SysConfigManager
    {
        //!!! VacancyContext никогда не умрёт, если будут случайные ошибки доступа
        //!!! к базе данных, значит проблема может быть здесь
        //static VacancyContext _db = new VacancyContext();
        private static string[,] defaultConfigsNames = new string[5, 2]
                                                       { { "Mail Adress", "vacmana@gmail.com" },
                                                         { "Mail Password", "nextdaynewlive" },
                                                         { "Mail ImapHost", "imap.gmail.com" },
                                                         { "Mail ImapPort", "933" },
                                                         { "Resume Image", "~/Content/lanitlogo.png"}};

        internal static IEnumerable<SysConfig> GetList()
        {
            VacancyContext _db = new VacancyContext();
            var objList = _db.SysConfigs.ToList();

            return objList;
        }

        internal static string Get(string name)
        {
            VacancyContext _db = new VacancyContext();
            var configItem = _db.SysConfigs.SingleOrDefault(sc => sc.Name == name);
            return null != configItem ? configItem.Value : null;
        }

        internal static int GetIntParameter(string name, int defaultValue)
        {
            VacancyContext _db = new VacancyContext();
            string tmp = Get(name);
            return tmp != null ? Int32.Parse(tmp) : defaultValue;
        }

        internal static bool GetStringParameter(string name)
        {
            string tmp = Get(name);
            /*Оператор ?? возвращает левый операнд, если он не равен null
             * и правый в противном случае
             */
            if (tmp != null)
                return true;
            else
                return false;
        }

        internal static string GetStringParameter(string name, string defaultValue)
        {
            string tmp = Get(name);
            /*Оператор ?? возвращает левый операнд, если он не равен null
             * и правый в противном случае
             */
            return tmp ?? defaultValue;
        }

        internal static bool GetBoolParameter(string name, bool defaultValue)
        {
            VacancyContext _db = new VacancyContext();
            string tmp = Get(name);
            return tmp != null ? Boolean.Parse(tmp) : defaultValue;
        }

        internal static SysConfig Create(string name, string value, string configGroup)
        {
            VacancyContext _db = new VacancyContext();
            var obj = new SysConfig
            {
                Name = name,
                Value = value,
                ConfigGroup = configGroup
            };

            _db.SysConfigs.Add(obj);
            _db.SaveChanges();

            return obj;
        }

        internal static void Update(int id, string name, string value)
        {
            VacancyContext _db = new VacancyContext();
            var obj = _db.SysConfigs.Where(conf => conf.Id == id).Single();

            if (obj != null)
            {
                obj.Name = name;
                obj.Value = value;
            };

            _db.SaveChanges();
        }


        internal static void CreateDefaultSysConfigParams() {
            VacancyContext _db = new VacancyContext();
            List<SysConfig> Configs = new List<SysConfig>();
            for (int i = 0; i < 4; i++ )
                {
                    if (Get(defaultConfigsNames[i, 0]) == null) _db.SysConfigs.Add(new SysConfig
                    {
                        Name = defaultConfigsNames[i,0],
                        Value = defaultConfigsNames[i, 1],
                        ConfigGroup = "Почтовый сервер"
                    });
                }

            for (int i = 4; i < 5; i++)
            {
                if (Get(defaultConfigsNames[i, 0]) == null) _db.SysConfigs.Add(new SysConfig
                {
                    Name = defaultConfigsNames[i, 0],
                    Value = defaultConfigsNames[i, 1],
                    ConfigGroup = "Резюме"
                });
            }

            _db.SaveChanges();
        }

        internal static void Delete(int id)
        {
            VacancyContext _db = new VacancyContext();
            var obj = _db.SysConfigs.Where(conf => conf.Id == id).Single();

            if (obj != null)
            {
                _db.SysConfigs.Remove(obj);
                _db.SaveChanges();
            }
        }
    }
}