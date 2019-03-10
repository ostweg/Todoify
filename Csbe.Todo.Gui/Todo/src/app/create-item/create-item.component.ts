import { Component, OnInit } from '@angular/core';
import {TodoService} from "../Interfaces/todo.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../Services/config.service";

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

  options = [
    {name: "low", value: 1},
    {name: "medium", value: 2},
    {name: "high", value: 3}
  ];

  constructor(public configs: ConfigService, public FormBuilder: FormBuilder) {
    this.messageForm = this.FormBuilder.group({
      name: ['', Validators.required],
      desc: ['', [Validators.required, Validators.maxLength(20)]],
      nameofp: ['', Validators.required],
      enddate: ['', Validators.required],
      importance: ['', Validators.required]
    });
    this.toDo = {
      Name: undefined,
      NameofPerson: undefined,
      ShortDescription: undefined,
      Importance: undefined,
      IsComplete: false,
      FinishDate: undefined
    }
  }

  ngOnInit() {
  }

  createTodo(event: any): void {
    this.submitted = true;
    if (this.messageForm.invalid) {
      return;
    } else {
      this.success = true;
      this.configs.PostTodoItem(this.toDo).subscribe((data: TodoService) => {
        this.toDo = {
          Name: undefined,
          NameofPerson: undefined,
          ShortDescription: undefined,
          Importance: undefined,
          IsComplete: undefined,
          FinishDate: undefined
        }
      });
    }

  }

}


