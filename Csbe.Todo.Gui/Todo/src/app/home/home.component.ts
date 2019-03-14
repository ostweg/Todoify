import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../Services/config.service";
import {TodoService} from "../Interfaces/todo.service";
import {CreateItemComponent} from "../create-item/create-item.component";
import {MatDialog} from "@angular/material";
import { UserService } from '../Interfaces/user.service';
import { Router } from '@angular/router';

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
  Todos:TodoService[] = [];
  UserId:number;
  User:UserService;
  username:string;
  constructor(public config: ConfigService,public Dialog:MatDialog,public router:Router) { }

  GetTodoItemsbyUserId(){
    var user = JSON.parse(localStorage.getItem('currentUser'));
    this.config.GetTodoItems().subscribe( items => {
      this.Todos = items.filter( y => y.createdBy == user.username);
    })
  }
  ngOnInit() {
    this.GetTodoItemsbyUserId();
  }
  Logout(){
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/signin');
  }
  toggle(){
    this.IsVisible =! this.IsVisible;
  }
  toggle1(){
    this.GetTodoItemsbyUserId();
    this.IsVisible1 =! this.IsVisible1;
  }
}
