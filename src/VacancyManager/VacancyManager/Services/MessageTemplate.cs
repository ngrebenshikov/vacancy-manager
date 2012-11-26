using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel;
using System.IO;
using System.Text.RegularExpressions;
using VacancyManager.Services.Managers;

namespace VacancyManager.Services
{
    internal static class MessageTemplate
    {
        public static string Get(string name, TemplateProp prop)
        {
            string defaultPath = @"D:\C#\StudProj\src\VacancyManager\VacancyManager\Content\MsgTpl.txt";
            string configPath = "MessageTemplate";
            string file = SysConfigManager.GetStringParameter(configPath, defaultPath);

            StreamReader sr = new StreamReader(file);
            string result = "";
            
            while (sr.Peek() > 0)
            {
                string pattern = String.Format(@"/\*{0}\*/", name);

                Regex regexTplName = new Regex(pattern, RegexOptions.Singleline);

                string str = sr.ReadLine();
                if (regexTplName.IsMatch(str))
                {
                    Regex regexTplEnd = new Regex(@"/\*end\*/");
                    while (sr.Peek() > 0)
                    {
                        str = sr.ReadLine();
                        if (regexTplEnd.IsMatch(str))
                            break;
                        else
                            result += str;
                    }     
                }
            }

            result = Format(result, prop);

            return result;
        }

        static string Format(string input, TemplateProp prop)
        {
            foreach (PropertyDescriptor p in TypeDescriptor.GetProperties(prop))
                input = input.Replace("{" + p.Name + "}", (p.GetValue(prop) ?? "NULL").ToString());

            return input;
        }
    }
}