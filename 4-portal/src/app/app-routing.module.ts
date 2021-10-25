import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/Screens/Home/home.component';
import { LoginComponent } from 'src/Screens/Login/login.component';
import { RegisterComponent } from 'src/Screens/Register/register.component';

const routes: Routes = [
{
  path:'home',
  component: HomeComponent
},

{
  path:'login',
  component: LoginComponent
},


{
  path:'register',
  component: RegisterComponent
},

{
  path:'',
  component: LoginComponent
}


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// const routes: Routes = [
//   {
//     path: 'home',
//     component: HomeComponent
//   },
//   {
//     path: '',
//     component: LoginComponent
//   },
//   {
//     path: 'login',
//     component: LoginComponent
//   },
//   {
//     path: 'register',
//     component: RegisterComponent
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })