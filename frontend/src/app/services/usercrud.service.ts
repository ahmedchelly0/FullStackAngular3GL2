import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../components/user/User';

@Injectable({
  providedIn: 'root'
})
export class UsercrudService {

  constructor(private http:HttpClient) { }

  UserAdd(user: { username: string | undefined; firstname: string | undefined; lastname: string | undefined;  email:string | undefined; password:string | undefined; isAdmin:boolean | undefined; student1:any}){
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.post('http://localhost:5000/api/user/register', user,{headers: headers})
    .pipe(map((res :any) => res.json));
    
  }



  getUserById(id:number){
    return this.http.get(`http://localhost:5000/api/user/getById/${id}`)
    
  }

  //: Observable<any> 
  UserDelete(idUser:number){
    return this.http.delete(`http://localhost:5000/api/user/delete/${idUser}`)
    .subscribe(data => console.log(data));
  }

  /* UserEdit(idUser:number,user: { username: string | undefined; firstname: string | undefined; lastname: string | undefined;  email:string | undefined; password:string | undefined; isAdmin:boolean | undefined; student1:any}){
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.put(`http://localhost:5000/api/user/edit/${idUser}`,user)
    .subscribe(data => console.log(data));
  } */
  
  UserEdit(data: any, id: string): Observable<any> {
    return this.http.put(`http://localhost:5000/api/user/edit/${id}`, data)
}

}
