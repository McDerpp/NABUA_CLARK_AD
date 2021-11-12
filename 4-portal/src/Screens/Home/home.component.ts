import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private api: HttpClient) {}
  




  ngOnInit(): void {   
    this.getAll();
  }

  users: Array<any> = [];
  fcSearch=new FormControl();
  fcInput=new FormControl();
  fcName=new FormControl();
  fcAge=new FormControl();
  fcEmail=new FormControl();
  fcPassword=new FormControl();
  

  Name= "current name";
  Age="current age";
  Email="current email";
 
  


  async getAll(){
    var result: any = await this.api
    .get(environment.API_URL + '/user/all').toPromise();
    this.users = result.data;       
  }

  async searchID(){
    if(this.fcInput.value==null){
    alert("input something");
  return;}

    var result: any = await this.api
    .get(environment.API_URL + '/user/'+this.fcInput.value).toPromise();    
  if(result.success==false){
  alert("ID does not exist")
  return} 
  this.users=Array(result.data);
  this.Name=result.data.name;
  this.Age=result.data.age;
  this.Email=result.data.email;
    }

  async search(){

    if(this.fcInput.value==null){
    alert("input something");
    return;}
  
      var result: any = await this.api
      .get(environment.API_URL + '/user/search/'+this.fcInput.value).toPromise();    
    if(result.success==false){
    alert("elements does not exist")
    return} 
    this.users=result.data;
    console.log(result.data.name.value)
   
    
  }


    async patchData(){
      if(this.fcInput.value==null){
      alert("input something")
    return;}

    var result: any = await this.api
    .patch(environment.API_URL + '/user/'+this.fcInput.value,
    Array({"name?":this.fcName.value,
    "age?":this.fcAge.value,
    "email?":this.fcEmail.value,
    "password?":this.fcPassword.value  
  })).toPromise();
  if(result.success==false){
  alert("ID does not exist")
  return
}
  else
  alert("successfully updated the credentials")
   
  }
 

  async deleteUserData(id:string){ 
   
    if(confirm("Are you sure you want to delete user:"+ id))
    var result: any = await this.api
    .delete(environment.API_URL + '/user/'+id).toPromise();
    if(result.success==false){
      alert("ID does not exist")
      return}
      this.getAll();
  }

  


  async testingStuff(stuff:string){

    alert(stuff)
  }
    


  nav(destination: string) {
    this.router.navigate([destination]);
  }
}