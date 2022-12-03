import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsercrudService } from 'src/app/services/usercrud.service';
import { User } from '../user/User';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  formuser:any;
  user:any | undefined
  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder,
    private usercrudService: UsercrudService,) {
  

      this.formuser = this.formBuilder.group({
        username: ['', [Validators.required]],
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        isAdmin: ['',  [Validators.required]],
        student1: ['' ,[Validators.required]],
  
  
    })


     }
     get username() {
      return this.formuser.get('username');
    }
    get firstname() {
      return this.formuser.get('firstname');
    }
   
    get email() {
      return this.formuser.get('email');
    }
   
    get lastname() {
      return this.formuser.get('lastname');
    }
    get password() {
      return this.formuser.get('password');
    }
    get isAdmin() {
      return this.formuser.get('isAdmin');
    }
    get student1() {
      return this.formuser.get('student1');
    }
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    console.log(id)
    this.updateData(id)
  }
  id = this.route.snapshot.params['id'];
  updateData(value: any) {
   
    this.usercrudService.getUserById(value).subscribe(
      res=>{
        this.user=res
        this.formuser.controls['username'].setValue(this.user.username);
        this.formuser.controls['firstname'].setValue(this.user.firstname);
        this.formuser.controls['lastname'].setValue(this.user.lastname);
        this.formuser.controls['email'].setValue(this.user.email);
        
        this.formuser.controls['isAdmin'].setValue(this.user.isAdmin);
        console.log('test')
        console.log(this.user.isAdmin)
        this.formuser.controls['student1'].setValue(this.user.student1);
      },err=>{

      }
    )
 
  }

  editusr() {
    console.log(this.formuser.value.username)
    console.log(this.formuser.value.firstname)
    console.log(this.formuser.value.lastname)
    console.log(this.formuser.value.email)
    let body = {
      username: this.formuser.value.username,
      firstname: this.formuser.value.firstname,
      lastname: this.formuser.value.lastname,
      email: this.formuser.value.email,
      
      isAdmin: this.formuser.value.isAdmin,
      student1: this.formuser.value.student1,
    }

    this.usercrudService.UserEdit(body,this.id)
      .subscribe(response => {
        console.log(response)
      })
  }



}
