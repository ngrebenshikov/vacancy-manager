using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC3AppCodeFirst.Models
{
    public class BlogClasses
    {
    }

    public class Blog
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string BloggerName { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
    }

    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime DateCreated { get; set; }
        public string Content { get; set; }
        public int BlogId { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }

    public class Comment
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public string Content { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}