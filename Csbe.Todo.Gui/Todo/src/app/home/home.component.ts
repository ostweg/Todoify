import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../Services/config.service";
import {TodoService} from "../Interfaces/todo.service";
import {CreateItemComponent} from "../create-item/create-item.component";
import {MatDialog} from "@angular/material";
import { UserService } from '../Interfaces/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  IsVisible:boolean = false;
  IsVisible1:boolean = false;
  selected = 'Your Assignments';
  int:number = 12;
  Todos:TodoService[];
  UserId:number;
  User:UserService;
  username:string;
  constructor(public config: ConfigService,public Dialog:MatDialog) { }

  GetUserId(){
    var user = JSON.parse(localStorage.getItem('currentUser'));
    this.User = {
      Username:user.username
    };
    this.username= user.username;
    this.config.GetUserId(this.User).subscribe( Id => {
      this.UserId = Id;
      console.log(Id);
    })
  }
  GetTodos(){
    this.config.GetTodoItems().subscribe( todos => {
      this.Todos = todos;
    });
  }
  ngOnInit() {
    this.GetTodos();
    this.GetUserId();
    console.log(this.selected);
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
  toggle1(){
    this.IsVisible1 =! this.IsVisible1;
  }
}
