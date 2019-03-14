import { Component, OnInit } from '@angular/core';
import {TodoService} from "../Interfaces/todo.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../Services/config.service";
import {UserService} from "../Interfaces/user.service";
import {MatDialogRef} from "@angular/material";
import {MatSnackBar} from "@angular/material";
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  private toDo: TodoService;
  public messageForm: FormGroup;
  User:UserService;
  submitted = false;
  success = false;
  selected: string;
  UserId:number;
  Users:UserService[];
  Currusername:string;

  options = [
    {name: "low", value: 1},
    {name: "medium", value: 2},
    {name: "high", value: 3}
  ];

  constructor(public configs: ConfigService, public FormBuilder: FormBuilder,public dialog:MatDialogRef<CreateItemComponent>,public snack:MatSnackBar) {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    this.messageForm = this.FormBuilder.group({
      name: ['', Validators.required],
      desc: ['', [Validators.required, Validators.maxLength(20)]],
      enddate: ['', Validators.required],
      nameofp:[''],
      importance: ['', Validators.required]
    });
    console.log('user is: '+ user.username);
    this.toDo = {
      name: undefined,
      user_ID: undefined,
      ShortDescription: undefined,
      createdBy: user.username,
      Importance: undefined,
      isComplete: undefined,
      finishDate: undefined,
    }
  }

  ngOnInit() {
    this.toDo.Importance = "select value";
    this.configs.GetUsers().subscribe( data => {
      this.Users= data;
    });
    var tokenUser = JSON.parse(localStorage.getItem('currentuser'));
    this.Currusername = tokenUser.username;
  }
  GetUsers():Observable<UserService>{
    let subject: Subject<UserService> = new Subject();  

    this.configs.GetUsers().subscribe( data => {
      subject.next(data.find(x => x.Username == this.Currusername));
    });
    return subject.asObservable(); 
}

  AddTodoItems(){
    this.success = true;
      this.configs.PostTodoItem(this.toDo).subscribe((data: TodoService) => {
        
        this.toDo = {
          name: undefined,
          user_ID: undefined,
          ShortDescription: undefined,
          Importance: undefined,
          isComplete: false,
          finishDate: undefined,
          
        };
      });
  }
  createTodo(event: any): void {
    this.submitted = true;
    if (this.messageForm.invalid) {
      return;
    } else {
     this.AddTodoItems();
      //someone help me. The unpleasant look of this code just shocks me utterly from the tip of my toes to the top of my head.
      this.dialog.close();
      this.snack.open("Created TodoItem","1",{
          duration:2000,
      });
    }

  }

}


