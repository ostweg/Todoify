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

        public string CreatedBy {get;set;}

        public long User_ID {get;set;}
    }
}