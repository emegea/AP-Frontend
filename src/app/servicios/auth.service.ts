import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL ='https://ap-backend-emegea.herokuapp.com';
  constructor(private http:HttpClient) { }

  signin(user:any){
    return this.http.post(`${this.URL}/usuario/login`, user);
  }

}
