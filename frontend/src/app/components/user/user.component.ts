import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsercrudService } from 'src/app/services/usercrud.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public users:any | undefined;
  username: any | undefined;
  firstname: any | undefined;
  lastname: any | undefined;
  email: any | undefined;
  password: any | undefined;
  isAdmin: boolean | undefined;
  student1: any | undefined;
  constructor(
    private http:HttpClient,
    private usercrudService: UsercrudService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

 getUsers(){
    this.http.get<any>('http://localhost:5000/api/user/register1').subscribe(
      Response => {
        console.log(Response);
        this.users = Response;
      }
    )
  } 

  onUsersSubmit(){
    const user ={
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      isAdmin: this.isAdmin,
      student1: this.student1,

    }
    this.usercrudService.UserAdd(user).subscribe(Data  => {
      console.log(Data)
    });

  } 

  removeUser(idUser: number) {
    this.usercrudService.UserDelete(idUser);
    console.log(idUser)
    
  }

  onUsersEdit(idUser: number){
    const user ={
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      isAdmin: this.isAdmin,
      student1: this.student1,

    }
    this.usercrudService.UserEdit(idUser ,user)

  } 

  

}
