import { ConsoleLogger, Injectable } from "@nestjs/common";
import { strictEqual } from "assert";
import { identity, isEmpty, map } from "rxjs";
import { resourceLimits } from "worker_threads";
import { User } from "./user.model";
import { Helper } from "./helper";
import { CRUDReturn } from "./return";
import * as admin from 'firebase-admin';
import { agent } from "supertest";
import { doc } from "prettier";
import { Test } from "@nestjs/testing";


@Injectable()
export class UserService {
    

        private users: Map<string,User> = new Map<string,User>()
        private DB = admin.firestore();
        

constructor(){   

    var populatedData = [];
  this.populate();
}

async populate(){
  console.log("yqay!")
  var newUser = [
   new User('Leanne Graham', 18, 'sincere@april.biz', 'LG_123456'),
    new User('Ervin Howell', 21, 'shanna@melissa.tv', 'EH_123123'),
   new User('Nathan Plains', 25, 'nathan@yesenia.net', 'NP_812415'),
  new User('Patricia Lebsack', 18, 'patty@kory.org', 'PL_12345')
 ]      
      newUser.forEach((User)=>{this.users.set(User.getId(),User);     }    
      
      ); 

     for(const user of newUser ){
      var check= this.checkEmailsV2(user.getEmail());
      if(check){
        this.users.set(user.getId(),user);    
        this.DB.collection("users").doc(user.getId()).set(user.toJsonPassword());
       var result = await user.commit();
      }
      }
            
  }


async getAll():Promise<CRUDReturn>{  

var populatedData = [];
try{
  var allUsers = await this. getAllUserObjects();
  allUsers.forEach((user)=>{
populatedData.push(user.toJsonId());
  });
  return {"success":true,"data":populatedData}
}catch(error){
  return {"success":false,"data":error() };

}
 
}



async getAllUserObjects():Promise<Array<User>>{  
  console.log("hello23232")
  var populatedData = [];
  try{
  var dbData : FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>=
  await this.DB.collection("users").get();
  dbData.forEach((doc)=>{
  if(doc.exists){
    var data=doc.data();
    populatedData.push(new User(
        data["name"],
        data["age"],
        data["email"],
        data["password"],
        data["id"],
    ));
    console.log(data.id)
  }
  })
   //for(const user of this.users.values())
    //   populatedData.push(user.toJson());
    return populatedData;
  }catch(error){
    return null;
  
  }
   
  }

async searchID(id:string):Promise<CRUDReturn>{

  var userResults = await this.DB.collection("users").get();
for(const doc of userResults.docs){  
if(doc.id===id){
  var data=doc.data();
 var newUser=new User(data["name"],data["age"],data["email"],data["password"],data["id"]);
 this.users.set(data["id"],newUser);  
  return{"success":true,"data":newUser.toJson()}
}

    }

    return {"success":false,
    "data":'FOUND NOT USER'};
}


async addUser(body:any):Promise<CRUDReturn>{
  var check:number=0;
  //parseInt(body.age);

  if(body.hasOwnProperty("name"&&"age"&&"email"&&"password")){    
    var exists = this.checkEmailsV2(body.email);
    if(await exists===true) {return{ success:false, "data":"EMAIL ALREADY EXISTED" }; }    
  
    if(typeof body?.name!="string"){check++;}
    if(typeof body?.age!="number"){check++;}
    if(typeof body?.password!="string"){check++;}
    if(typeof body?.email!="string"){check++;}     
  
console.log("checking:" + body.name)
console.log("checking:" + body.age)
console.log("checking:" + body.password)
console.log("checking:" + body.email)

console.log("checking type:" +typeof(body.name))
console.log("checking type:" + typeof(body.age))
console.log("checking type:" + typeof(body.password))
console.log("checking type:" + typeof(body.email))

    if(exists){

      if(check==0){
        var newUser : User;
    //    newUser=new User(body?.name,body?.age,body?.email,body?.password);
     newUser=new User(body?.name,body?.age,body?.email,body?.password,body?.id);
        this.users.set(newUser.getId(),newUser);    
        this.DB.collection("users").doc(newUser.getId()).set(newUser.toJsonPassword());
       var result = await newUser.commit();

       console.log("VALID!")
        return{ success:true,data: newUser.toJsonId()};}        
      }
        }
return{ success:false, "data":"INVALID CREDENTIALS" } 

}


async checkEmailsV2(email:string,options?:{exceptionId:string}):Promise<boolean>{
  if(email==null) return false;

 var userResults = await this.DB.collection("users").where("email","==",email).get();
  if(userResults.empty) return false;
    for(const doc of userResults.docs){
  


if(options!=undefined){
  if(doc.id==options.exceptionId) continue;
}
if(doc.data()["email"]===email){
  console.log("yes!")
return true;

}

    }
console.log("no!")
    return false;

  }

async changeData(id:string,body:any):Promise<CRUDReturn>{
  var check:number=0;

    if(body.hasOwnProperty("name"&&"age"&&"password"&&"email")){    
      var exists = this.checkEmailsV2(body.email,{exceptionId:id});
      if(await exists===true) {return{ success:false, "data":"EMAIL ALREADY EXISTED" }; }


     if(typeof body?.name!=="string"){check++;} 
     if(typeof body?.age!=="number"){check++;}     
     if(typeof body?.password!=="string"){check++;}    
     if(typeof body?.email!=="string"){check++;}
     

    if(check!=0) return{ success:false, data: "INVALID" };  

  
  var change : FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>= await this.DB.collection("users").get();
  for(const doc of change.docs){
    if (doc.id===id){
      var putData=this.DB.collection("users").doc(id);
      var result =putData.update({
        "name":body.name,
        "age":body.age,
        "email":body.email,
       "password":body.password
      
      })
      return {"success":true,"data":"this.usero"}
    }

  }
  
       
    }
    
 
return{"success":false,"data":"USER DOES NOT EXIST"}

}

checkEmails(body:any,id:string):boolean{

  for(const [key,user] of this.users.entries()){ 
      if((this.users.get(key).checkEmail(body))==true)  
        return true}    
       return false}


  

async patchData(id:string,body:any):Promise<CRUDReturn>{

 var exists = this.checkEmailsV2(body.email,{exceptionId:id});
  if(await exists===true) {return{ success:false, "data":"EMAIL ALREADY EXISTED" }; }

  var change : FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>= await this.DB.collection("users").get();  
  var putData=this.DB.collection("users").doc(id); 
  for(const doc of change.docs){ 
    console.log(doc.id,"==",id);
    if (doc.id==id){
      
    var check:number=0;
    var namePatch=doc.data()["name"];
    var passwordPatch=doc.data()["password"];
    var agePatch=doc.data()["age"];
   var emailPatch=doc.data()["email"];

    if(body.hasOwnProperty("name")){
      if(typeof body?.name!=="string"){check++;} 
      namePatch=body.name;   
      }
      
    if(body.hasOwnProperty("age")){
      if(typeof body?.age!=="number"){check++;} 
        agePatch=body.age       
        }
      
    if(body.hasOwnProperty("password")){
      if(typeof body?.password!=="string"){check++;} 
      passwordPatch=body.password;
        
     
          
        }
      
    if(body.hasOwnProperty("email")){
      if(typeof body?.email!=="string"){check++;} 
          emailPatch=body.email;
          console.log("naay email");
          }      

          if(check!=0) return{ success:false, data: "INVALID TYPES" };  


    
      var result =putData.update(        
        {
        "name":namePatch,
        "age":agePatch,
        "email":emailPatch,
       "password":passwordPatch
    
      })
  

      

      return {"success":true,"data":"UPDATED"}
    }
   

  }
  return{"success":false,"data":"USER DOES NOT EXIST"}
      
  
    
    
        
      }
      
   
 
  
    async deleteUserData(id:string):Promise<CRUDReturn>{
      var change : FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>= await this.DB.collection("users").get();      
      for(const doc of change.docs){ 
        if (doc.id==id){
      const res = await this.DB.collection('users').doc(id).delete();
      return{"success":true,"data":"USER SUCCESSFULY DELETED"};
        }
    }
    return{"success":false,"data":"USER DOES NOT EXIST"};
  }
/*

deleteUserData(id:string):CRUDReturn{
  if(this.users.has(id)){
     this.users.delete(id);
        return{ "success":true,
    "data": "SUCCESSFULLY DELETED THE USER"}}

    return{"success":false,
        "data": "cant find the user"}

}*/

async login(body:any):Promise<CRUDReturn>{

  var ctr:number = 0;   
  var login : FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>=
  await this.DB.collection("users").get();
 // await (await this.DB.collection("users").get()).readTime;
  for(const doc of login.docs){
      if(doc.data()["email"]==body.email&&doc.data()["password"]==body.password){
        var data=doc.data();
        var newUser=new User(data["name"],data["age"],data["email"],data["password"],data["id"]);
        this.users.set(data["id"],newUser);  
         return{"success":true,"data":newUser.toJson()}}
       
          
       }

         
 return {"success":false,"data":"FAILED"}


}

search(search:any):CRUDReturn{
  var storage = [];

  for(const [key,user] of this.users.entries()){   
    if(this.users.get(key).checkValue(search)===true){
      console.log(this.users.get(key).checkValue(search));
      storage.push(user.toJson());   
        }
  }

  if( storage.length===0)
  return {"success": false,
  "data":storage }


  return {"success": true,
  "data":storage }

}

}
