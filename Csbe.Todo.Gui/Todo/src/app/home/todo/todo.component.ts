import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CreateItemComponent} from "../../create-item/create-item.component";
import {ConfigService} from "../../Services/config.service";
import {TodoService} from "../../Interfaces/todo.service";
import {UserService} from '../../Interfaces/user.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() toDo$:TodoService;
  constructor(public Dialog:MatDialog, public configs:ConfigService){
    this.TodoItem = {
      Importance:undefined,
      ShortDescription: undefined,
      createdBy:undefined,
      finishDate:undefined,
      isComplete:undefined,
      name:undefined,
      user_ID:undefined
    }
  }
  IsVisible:boolean = true;
  selected = 'Your Assignments';
  int:number = 12;
  Todos:TodoService[];
  UserId:number;
  User:UserService;
  username:string;
  IsDisabled = false;
  TodoItem:TodoService;

  GetUsignedTodos(){
    this.IsDisabled = true;
    this.configs.GetTodoItems().subscribe(items => {
      this.Todos = items.filter(x => x.user_ID == 0);
    })
  }
  GetAllTodos(){
    this.IsDisabled = true;
    this.configs.GetTodoItems().subscribe(items => {
      this.Todos = items.filter(x => x.user_ID != 0);
    });
  }
  GetTodos() {
    this.IsDisabled == false;
    var user = JSON.parse(localStorage.getItem('currentUser'));
    this.User = {
      Username:user.username
    };
    this.username= user.username;
    this.configs.GetUserId(this.User).subscribe( Id => {
      this.UserId = Id;
      this.configs.GetTodoItems().subscribe( items => {
        this.Todos = items.filter(y => y.user_ID == this.UserId && y.isComplete == false);
      })
    })
  }
  ngOnInit() {
    this.GetTodos();
    this.getitem();
  }
  TodoItemDone(event, id){
   event.isComplete = true;
   this.configs.UpdateData(event).subscribe((data:TodoService) => {
    this.configs.GlobalData();
  });
  }

  toggle(){
    this.IsVisible =! this.IsVisible;
    
  }
  
  getitem(){
    console.log(this.selected);
    if(this.selected == "Your Assignments"){
     this.GetTodos();
     this.IsDisabled = false;
      console.log(this.IsDisabled);
    }
    if(this.selected == "Not Assigned"){
      this.GetUsignedTodos();
      console.log(this.IsDisabled);
    }
    if(this.selected == "Assigned"){
      this.GetAllTodos();
      console.log(this.IsDisabled);
    }

  }
  openDialog(){
    const dialogRef = this.Dialog.open(CreateItemComponent, {
      width:'500px'
    });
    dialogRef.afterClosed().subscribe( result => {
      this.GetTodos();
    });
  }



}
