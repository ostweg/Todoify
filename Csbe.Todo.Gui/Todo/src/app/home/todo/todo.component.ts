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
  constructor(public Dialog:MatDialog, public configs:ConfigService){}
  IsVisible:boolean = false;
  selected = 'Your Assignments';
  int:number = 12;
  Todos:TodoService[];
  UserId:number;
  User:UserService;
  username:string;
  GetUsignedTodos(){
    this.configs.GetTodoItems().subscribe(items => {
      this.Todos = items.filter(x => x.user_ID == 0);
    })
  }
  GetAllTodos(){
    this.configs.GetTodoItems().subscribe(items => {
      this.Todos = items;
    });
  }
  GetTodos() {
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
  TodoItemDone(event:any){
    console.log("test");
  }

  toggle(){
    this.IsVisible =! this.IsVisible;
    
  }
  
  getitem(){
    if(this.selected == "Your Assignments"){
     this.GetTodos();
    }
    if(this.selected == "Not Assigned"){
      this.GetUsignedTodos();
    }
    if(this.selected == "Assigned"){
      this.GetAllTodos();
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
