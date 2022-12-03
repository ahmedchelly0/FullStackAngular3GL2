import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    'email': String
    'password': String;
  constructor(
   
     private loginService: LoginService,
     private router: Router
  ) { }

  ngOnInit(): void {
  }


  onLoginSubmit(){
    const user ={
      email: this.email,
      password: this.password
    }

    this.loginService.authenticateUser(user).subscribe(Data => {
      console.log(user)
      console.log(Data)
      // this.authService.StoreUserData(Data.token , Data.user);
      
      this.router.navigate(['/admin_dashbord']);
    
    })


  }
  

}
