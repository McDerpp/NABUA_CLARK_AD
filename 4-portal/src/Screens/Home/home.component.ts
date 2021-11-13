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
    this.fcId==null
  }



  users: Array<any> = [];
  fcSearch=new FormControl();
  fcInput=new FormControl();

  fcName=new FormControl();
  fcAge=new FormControl();
  fcEmail=new FormControl();
  fcPassword=new FormControl();
  fcConfirmPassword=new FormControl();

  InName:any="";
  InAge:any="";
  InEmail:any="";
  InPassword:any="";
  

  
  fcId:any;
  selection:any;
  
  
   

  async getAll(){
    this.fcId=null
    
    var result: any = await this.api
    .get(environment.API_URL + '/user/all').toPromise();
    this.users = result.data;  

    
   

  }

  async searchID(id:any){    
    this.fcId=id;
    console.log(id)
    var result: any = await this.api
    .get(environment.API_URL + '/user/'+ id).toPromise();    
  if(result.success==false){
  alert("ID does not exist")
  return}  
  // this.Name="user:",result.data.name
  // this.Age=result.data.age;
  // this.Email=result.data.email;

  this.InName=result.data.name
  this.InAge=result.data.age;
  this.InEmail=result.data.email;
  this.InPassword=result.data.password;



      // console.log("pre:",this.InEmail.value)
      // console.log("pre:",this.InPassword.value)
    }

  async search(){
   this.selection=this.fcInput;
    if(this.fcInput.value==null){
    alert("input something");
    return;}
  
      var result: any = await this.api
      .get(environment.API_URL + '/user/search/'+this.fcInput.value).toPromise();    
    if(result.success==false){
    alert("elements does not exist")
    return} 
    this.users=result.data;
    console.log(result.data)
   
    
  }


    async patchData(){ 
      
        if(this.fcId==null){
          alert("select a user first to change credentials")      
          return
          }

        if(this.fcPassword.value!=this.fcConfirmPassword.value){
          alert("Password does not match")          
          this.fcAge.setValue(null)
          this.fcEmail.setValue(null)
          this.fcName.setValue(null)
          this.fcPassword.setValue(null)
          this.fcConfirmPassword.setValue(null)
          return
          }


      if(this.fcName.value==" ")
      alert("EY!")

      if(this.fcName.value=="")
      alert("yo!")
 
      if(this.fcName.value==null)
      alert("yow!")

      if(this.fcName.value!=""){
      this.InName=this.fcName.value}

      if(this.fcAge.value!=""){
      this.InAge=this.fcAge.value}

      if(this.fcEmail.value!=""){
      this.InEmail=this.fcEmail.value}

      if(this.fcPassword.value!=""){
      this.InPassword=this.fcPassword.value}

      // console.log("when empty:",this.InName)


      console.log("this is the id when arrive at patch:",this.fcId)
    var result: any = await this.api
    .patch(environment.API_URL + '/user/'+ this.fcId,
    {"name":String(this.InName),
    "age":parseInt(this.InAge),
    "email":String(this.InEmail),
    "password":String(this.InPassword)  
  }).toPromise();

  console.log(result.data)



  if(result.success==false){
  alert(result.data)
  return
}
  else
  alert("successfully updated the credentials")


  this.fcId==null

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