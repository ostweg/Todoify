import { Component, OnInit } from '@angular/core';
import {TodoService} from "../Interfaces/todo.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../Services/config.service";
import {UserService} from "../Interfaces/user.service";
import {MatDialogRef} from "@angular/material";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  private toDo: TodoService;
  public messageForm: FormGroup;
  submitted = false;
  success = false;
  selected: string;
  UserId:number;
  Users:UserService[];

  options = [
    {name: "low", value: 1},
    {name: "medium", value: 2},
    {name: "high", value: 3}
  ];

  constructor(public configs: ConfigService, public FormBuilder: FormBuilder,public dialog:MatDialogRef<CreateItemComponent>,public snack:MatSnackBar) {
    this.messageForm = this.FormBuilder.group({
      name: ['', Validators.required],
      desc: ['', [Validators.required, Validators.maxLength(20)]],
      nameofp: ['', Validators.required],
      enddate: ['', Validators.required],
      importance: ['', Validators.required]
    });

    this.toDo = {
      name: undefined,
      user_ID: undefined,
      ShortDescription: undefined,
      Importance: undefined,
      isComplete: false,
      finishDate: undefined
    }
  }

  ngOnInit() {
    this.toDo.Importance = "select value";
    this.configs.GetUsers().subscribe( data => {
      this.Users= data;
    });
  }

  createTodo(event: any): void {
    this.submitted = true;
    if (this.messageForm.invalid) {
      return;
    } else {
      this.success = true;
      this.configs.PostTodoItem(this.toDo).subscribe((data: TodoService) => {
        this.toDo = {
          name: undefined,
          user_ID: undefined,
          ShortDescription: undefined,
          Importance: undefined,
          isComplete: false,
          finishDate: undefined
        };
      });
      this.dialog.close();
      this.snack.open("Created TodoItem","1",{
          duration:2000,
      });
    }

  }

}


