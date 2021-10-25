import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  

  constructor(private router:Router, private api:HttpClient) { }

  ngOnInit(): void {
  }

  fCEmail = new FormControl();
  fCPassword = new FormControl();
  requestResult = '';



async login(){
var result:any= await this.api.post(environment.API_URL+"/user/login",
{"email":this.fCEmail.value,
"password":this.fCPassword.value}).toPromise();

console.log(result.success);
this.requestResult=result.data;
console.log(this.requestResult);


if(result.success){
  this.nav('home');
}
  
  
}

register(){
  this.nav('register')
}




nav(destination:string){
  this.router.navigate([destination])
}

  

}
