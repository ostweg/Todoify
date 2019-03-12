import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public router:Router) { }

  canActivate() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    try {
      if (user.username == " ") {
        this.router.navigateByUrl("/signin");

      }
      return true;
    } catch (e) {
      this.router.navigateByUrl("/signin");
    }
  }
}
