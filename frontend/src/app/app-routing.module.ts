import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashbordComponent } from './components/admin-dashbord/admin-dashbord.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { StudentComponent } from './components/student/student.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [

  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'admin_dashbord', component: AdminDashbordComponent},
  {path:'users', component: UserComponent},
  {path:'students', component: StudentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


