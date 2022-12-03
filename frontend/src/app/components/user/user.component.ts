import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsercrudService } from 'src/app/services/usercrud.service';

export class User {
  id?: string;
  username: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  password: string | undefined;
  isAdmin: boolean | undefined;
  student1: number | undefined;
  published?:boolean
}

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
  student1: number | undefined;
   id: number |undefined;
   user: User | undefined;
   editForm: FormGroup | undefined;


   @Input() currentUser: User = {
    id:'',
     username: '',
     firstname: '',
     lastname: '',
     email: '',
     password: '',
     isAdmin: true,
     student1: 1,
     published:false
   };


  constructor(
    private http:HttpClient,
    private usercrudService: UsercrudService,
    private router:Router
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

  /* onUsersEdit(idUser:number){
     const user ={
      _id: this._id,
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      isAdmin: this.isAdmin,
      student1: this.student1,

    } 
    this.usercrudService.UserEdit(idUser,user)

  }  */

  
  

  editDetails(id :number){
    this.router.navigate(['students',id]);
  }

  updateData(value: any) {
    let body = {
      username: value.username,
      firstname: value.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      isAdmin: this.isAdmin,
      student1: this.student1,
    }
    //this.router.navigate(['students',id]);

    this.usercrudService.UserEdit(body, `638a5773fde98f9cc93e61cb`)
      .subscribe(response => {
        console.log(response)
      })
  }
  

  

}
