import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../Services/config.service";
import {UserService} from "../Interfaces/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  private User: UserService;
  public MessageForm:FormGroup;
  SomethingWentWrong:boolean = false;
  PwOrUserIsWrong:boolean = false;
  constructor(public configs: ConfigService, public FormBuilder:FormBuilder, public route:Router) {
    this.MessageForm = this.FormBuilder.group({
      Username:['',Validators.required],
      Password:['',[ Validators.required,Validators.minLength(8),Validators.maxLength(8)]]
    });
    this.User = {
      Username:undefined,
      PwHash: undefined
    };

  }

  ngOnInit() {

  }
  AuthenticateUser(event:any,Username:string){
    if(this.MessageForm.invalid){
      console.log('invalid');
    }else {
      localStorage.setItem('currentUser',JSON.stringify({username:Username}));
      this.configs.AuthenticateUser(this.User).subscribe((data: UserService) => {
        this.User = {
          Username:undefined,
          PwHash: undefined
        };
        this.route.navigateByUrl('/home');
        console.log("test");
      }, error1 => {
        if(error1["statusText"] == "Internal Server Error"){
          this.PwOrUserIsWrong = true;
        }
        if(error1["statusText"] == "Forbidden"){
          this.PwOrUserIsWrong = true;
        }
      });
    }
  }

}
