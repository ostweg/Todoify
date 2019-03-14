import {Component, Input, OnInit} from '@angular/core';
import {TodoService} from "../../Interfaces/todo.service";
import { ConfigService } from '../../Services/config.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TNodeProviderIndexes } from '@angular/core/src/render3/interfaces/node';
import { UserService } from 'src/app/Interfaces/user.service';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() toDo$:TodoService;
  counter:number;
  Users:UserService[];

  constructor(public cs:ConfigService,public snack:MatSnackBar) { }

  ngOnInit() {
    this.cs.GetUsers().subscribe( data => {
      this.Users = data;
    })
  }
  change(event:any){
    this.cs.UpdateData(this.toDo$).subscribe((data:TodoService) => {
      this.cs.GlobalData();
    });
    this.snack.open("Updated TodoItem","1",{
      duration:2000,
  });
  }
  delete(event:any){
    this.cs.DeleteData(this.toDo$).subscribe((data:TodoService) => {
      this.cs.GlobalData();
    })
    this.snack.open("Deleted TodoItem","1",{
      duration:2000,
  });
  }

}
