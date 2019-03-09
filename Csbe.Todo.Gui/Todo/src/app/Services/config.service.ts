import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from '../Interfaces/user.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private url = 'https://localhost:5001/api/User';
  constructor(private HttpClient:HttpClient) { }

  PostUser(User:UserService):Observable<UserService>{
    console.log(User);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
      return this.HttpClient.post<UserService>(`${this.url}`, User,httpOptions);
  }

}

