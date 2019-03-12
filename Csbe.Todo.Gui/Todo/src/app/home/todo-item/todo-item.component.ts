import {Component, Input, OnInit} from '@angular/core';
import {TodoService} from "../../Interfaces/todo.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() toDo$:TodoService;
  constructor() { }

  ngOnInit() {

  }

}
