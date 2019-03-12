import { Component, OnInit } from '@angular/core';
import {UserService} from '../Interfaces/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfigService} from '../Services/config.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public RegisterForm:FormGroup;
  private User:UserService;
  submitted:boolean = false;
  UserExists:boolean = false;
  constructor(public FormBuilder:FormBuilder, public config: ConfigService, public route:Router) {
    this.RegisterForm = this.FormBuilder.group({
      Name:['', Validators.required],
      Username: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(8)]]
    });
    this.User = {
      Name:undefined,
      Email:undefined,
      Username:undefined,
      PwHash:undefined,
    }
  }

  ngOnInit() {

  }
  RegisterUser(event:any,Username:string){


  this.submitted = true;
  if(this.RegisterForm.invalid){
    console.log("invalid");
  }
  else {
    localStorage.setItem('currentUser',JSON.stringify({username:Username}));
    this.config.PostUser(this.User).subscribe((user:UserService) => {
      this.User = {
        Name:undefined,
        Email:undefined,
        Username:undefined,
        PwHash:undefined,
      };
    },error => {
      if(error["statusText"] == "Conflict"){
        this.UserExists = true;
      }
      if(error["statusText"] == "Internal Server Error"){
        this.route.navigateByUrl('/home');
      }
    });
  }
  }

}
