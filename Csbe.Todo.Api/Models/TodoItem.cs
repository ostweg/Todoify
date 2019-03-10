using System;

namespace Csbe.Todo.Api.Models
{
    public class TodoItem
    {
        public long Id {get;set;}

        public string Name {get; set;}

        public DateTime FinishDate {get;set;}

        public string Importance {get;set;}

        public bool IsComplete {get; set;}

        public User User {get;set;}
    }
}