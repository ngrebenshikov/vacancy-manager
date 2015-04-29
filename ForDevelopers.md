# Общение #

[Группа в Google Groups](http://groups.google.com/group/lt-abakan-stud-projects-vacancy-mgr)

# Программы #

  * TortoiseHg with Mercurial - http://mercurial.selenic.com/downloads/
  * MS SQL Server 2008 [R2](https://code.google.com/p/vacancy-manager/source/detail?r=2) Express Edition - http://www.microsoft.com/sqlserver/en/us/editions/express.aspx
  * Microsoft Visual Studio Express 2010 (C# and Web developer)- http://www.microsoft.com/express/Downloads/
  * ExtJS 4 - http://www.sencha.com/products/extjs/download?page=a

# Документация #

  * Visual Studio 2010 Help Downloader - http://vshelpdownloader.codeplex.com/
  * Visual C# - http://msdn.microsoft.com/en-us/library/618ayhy6(v=vs.71).aspx
  * Microsoft .NET - http://msdn.microsoft.com/en-us/library/gg145045.aspx
  * HTML, CSS, JavaScript DOM - https://developer.mozilla.org/en-US/docs

## Подход к работе с БД CodeFirst ##
  * http://habrahabr.ru/blogs/net/121132/
  * http://www.calabonga.com/blog/ViewPost.aspx?id=82
  * [EF 4.2 Code First Walkthrough](http://blogs.msdn.com/b/adonet/archive/2011/09/28/ef-4-2-code-first-walkthrough.aspx)
  * [EF 4.3 Automatic Migrations Walkthrough](http://blogs.msdn.com/b/adonet/archive/2012/02/09/ef-4-3-automatic-migrations-walkthrough.aspx)
  * [Connection strings for SQL Server 2008](http://www.connectionstrings.com/sql-server-2008)

## Secha ExtJS ##
  * Sencha ExtJS - http://docs.sencha.com/ext-js/4-0/
  * [Architecting Your App in Ext JS 4, Part 1](http://www.sencha.com/learn/architecting-your-app-in-ext-js-4-part-1/)
  * [Architecting Your App in Ext JS 4, Part 2](http://www.sencha.com/learn/architecting-your-app-in-ext-js-4-part-2/)
  * [Architecting Your App in Ext JS 4, Part 3](http://www.sencha.com/learn/architecting-your-app-in-ext-js-4-part-3/)

# Книги #

  * Джеффри Рихтер, CLR via C#. Программирование на платформе Microsoft .NET Framework 4.0 на языке C# - http://www.ozon.ru/context/detail/id/7425674/ (англ - http://www.ozon.ru/context/detail/id/5047621/)
  * Адам Фримен, Стивен Сандерсон, ASP.NET MVC 3 Framework с примерами на C# для профессионалов - http://www.ozon.ru/context/detail/id/7437061/ (англ - http://www.amazon.com/Pro-ASP-NET-MVC-3-Framework/dp/1430234040)

# Архитектура #

## Серверная часть ##

  1. ASP.NET MVC 3
  1. Microsoft SQL Server 2008 [R2](https://code.google.com/p/vacancy-manager/source/detail?r=2) Express Edition
  1. Доступ к данным через LINQ с применением подхода CodeFirst. Доки см. выше.

## Клиентская часть ##

  1. ExtJS (HTML, CSS, JavaScript)

## Паттерны проектирования ##

### Repository ###
  * Базовая информация: http://design-pattern.ru/patterns/repository.html
  * Проблемы паттерна и способы их решения: http://blog.byndyu.ru/2011/01/domain-driven-design-repository.html http://blog.byndyu.ru/2011/08/repository.html

### Dependency Inversion ###
  * Базовая информация: http://blog.byndyu.ru/2009/12/blog-post.html
  * Ещё одна статья с основами: http://habrahabr.ru/post/131993/
  * Видео урок: http://blog.byndyu.ru/2010/04/blog-post.html

# Начало работы с Mercurial #

## Кратко ##

  1. Установить TortooseHG (ссылку ищи выше)
  1. Выбери каталог для репозитория.
  1. Нажми на нем правую кнопку мыши и выбреи TortooseHG->Clone
  1. Набери URL со страницы  http://code.google.com/p/vacancy-manager/source/checkout
  1. Создать свою папку в каталоге sandbox и сохранить туда свой проект.
  1. Открыть HgWorkbench так же выбрав его в контекстом меню на каталоге репозитория.
  1. Сделать Commit (кнопка справа), написав внятный комментарий.
  1. Сделать Push (кнопка в верхнем меню). Написать свой пароль, который можно посмотреть на странице - http://code.google.com/hosting/settings

Для того, чтобы получить изменения пользоваться кнопкой Pull, а потом Update.

## Подробно ##

Посмотрите какие бывают подходы к работе с Меркуриалом http://mercurial.selenic.com/wiki/Workflows. Особое внимание уделите разделу [CVS-like Workflow](http://mercurial.selenic.com/wiki/Workflows#CVS-like_Workflow), так как мы используем его в нашем проекте.