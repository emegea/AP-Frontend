import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL ='http://localhost:8080';
  constructor(private http:HttpClient) { }

  signin(user:any){
    return this.http.post(`${this.URL}/usuario/login`, user);
  }

}
