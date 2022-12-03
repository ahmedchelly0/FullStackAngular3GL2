import { Injectable } from '@angular/core';
//new added
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authToken: any;
  token: string | undefined
  user :any;


  constructor(private http:HttpClient) { }


  authenticateUser(user: any){
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.post('http://localhost:5000/api/user/login', user,{headers: headers})
    .pipe(map((res :any) => res.json));
  }





}
