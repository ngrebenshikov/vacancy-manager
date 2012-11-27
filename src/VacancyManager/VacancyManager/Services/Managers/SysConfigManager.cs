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

        internal static int GetIntParametr(string name, int defaultValue)
        {
            VacancyContext _db = new VacancyContext();
            string tmp = Get(name);
            return tmp != null ? Int32.Parse(tmp) : defaultValue;
        }

        internal static string GetStringParameter(string name, string defaultValue)
        {
            string tmp = Get(name);
            /*Оператор ?? возвращает левый операнд, если он не равен null
             * и правый в противном случае
             */
            return tmp ?? defaultValue;
        }

        internal static SysConfig Create(string name, string value)
        {
            VacancyContext _db = new VacancyContext();
            var obj = new SysConfig
            {
                Name = name,
                Value = value
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