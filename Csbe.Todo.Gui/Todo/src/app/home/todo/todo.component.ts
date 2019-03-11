import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CreateItemComponent} from "../../create-item/create-item.component";
import {ConfigService} from "../../Services/config.service";
import {TodoService} from "../../Interfaces/todo.service";


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(public Dialog:MatDialog, public configs:ConfigService) { }
  IsVisible:boolean = false;
  selected = 'Your Assignments';
  int:number = 12;
  Todos:TodoService[];
  GetTodos(){
    this.configs.GetTodoItems().subscribe( todos => {
      this.Todos = todos;
    });
  }
  ngOnInit() {
    this.GetTodos();
  }
  openDialog(){
    const dialogRef = this.Dialog.open(CreateItemComponent, {
      width:'500px'
    });
    dialogRef.afterClosed().subscribe( result => {
      this.GetTodos();
    });
  }
  toggle(){
    this.IsVisible =! this.IsVisible;
  }


}
