import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from '../Interfaces/user.service';
import {Observable} from 'rxjs';
import {TodoService} from "../Interfaces/todo.service";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private url = 'https://localhost:5001/api/User';
  private url1 = 'https://localhost:5001/api/TodoItem';
  constructor(private HttpClient:HttpClient) { }
  GetUsers():Observable<UserService[]>{
    return this.HttpClient.get<UserService[]>(`${this.url}`);
  }
  GetTodoItems():Observable<TodoService[]>{
    return this.HttpClient.get<TodoService[]>(`${this.url1}`);
  }
  PostUser(User:UserService):Observable<UserService>{
    console.log(User);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
      return this.HttpClient.post<UserService>(`${this.url}`, User,httpOptions);
  }
  AuthenticateUser(User:UserService):Observable<UserService>{

    return this.HttpClient.post<UserService>(`${this.url}/authenticate`,User);
  }
  PostTodoItem(object:TodoService):Observable<TodoService>{
    const httpOptions = {
      headers: new HttpHeaders ({
        'Content-Type': 'application/json',
      })
    };
    return this.HttpClient.post<TodoService>(`${this.url1}`, object, httpOptions);
  }

}

