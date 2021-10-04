import { Injectable } from "@nestjs/common";
import { strictEqual } from "assert";
import { identity, isEmpty, map } from "rxjs";
import { resourceLimits } from "worker_threads";
import { User } from "./user.model";
import { Helper } from "./helper";
import { CRUDReturn } from "./return";

@Injectable()
export class UserService {

        private users: Map<string,User> = new Map<string,User>()

constructor(){   
    var populatedData = [];
    this.populate();
}

populate(){
  var newUser = [
    new User('Leanne Graham', 18, 'sincere@april.biz', 'LG_123456'),
    new User('Ervin Howell', 21, 'shanna@melissa.tv', 'EH_123123'),
    new User('Nathan Plains', 25, 'nathan@yesenia.net', 'NP_812415'),
    new User('Patricia Lebsack', 18, 'patty@kory.org', 'PL_12345'), ];
      
      newUser.forEach((User)=>{this.users.set(User.getId(),User);}); 
  }


getAll():CRUDReturn{  
var populatedData = [];

  for(const user of this.users.values())
     populatedData.push(user.toJson());

  return {"success":true,"data":populatedData}
}


searchID(id:string):CRUDReturn{
  for(const [key,user] of this.users.entries()){ 
     if(this.users.has(id)===true){
      return {"success":true,"data":this.users.get(id).toJson()}
    }      
}  

    return {success:false,
    data:'FOUND NOT USER'};
}


addUser(body:any):CRUDReturn{
  var check:number=0;

  if(body.hasOwnProperty("name"&&"age"&&"email"&&"password")==true){    
        
    if(typeof body?.name!="string"){check++; console.log("INVALID NAME") };
    if(typeof body?.age!="number"){check++; console.log("INVALID AGE")} ;
    if(typeof body?.password!="string"){check++; console.log("INVALID PASSWORD")};
    if(typeof body?.email!="string"){check++; console.log("INVALID EMAIL")};          

     if(this.checkEmails(body,null)) {return{ success:false, "data":"EMAIL ALREADY EXISTED" } }
     
      if(check==0){
        var newUser : User;
        newUser=new User(body?.name,body?.age,body?.email,body?.password);
        this.users.set(newUser.getId(),newUser);    
        
        return{ success:true,data: newUser.toJson()};} 
       }
        return{ success:false, "data":"INVALID CREDENTIALS" } 
}


changeData(id:string,body:any):CRUDReturn{
  var check:number=0;

    if(this.checkEmails(body,null)) {
      return{ success:false, "data":"EMAIL ALREADY EXISTED"}}  

    if(body.hasOwnProperty("name"&&"age"&&"password"&&"email")){       

     if(typeof body?.name!=="string"){check++; console.log("INVALID NAME") }
     if(typeof body?.age!=="number"){check++; console.log("INVALID AGE")} 
     if(typeof body?.password!=="string"){check++; console.log("INVALID PASSWORD")}
     if(typeof body?.email!=="string"){check++; console.log("INVALID EMAIL")}

    if(check!=0) return{ success:false, data: "INVALID" };  
  
     if(this.users.has(id)!=true){ return{"success":false,"data":"USER DOES NOT EXIST"}}   
      
     this.users.get(id).putData(body);

      return{ success:true,data:this.users.get(id).toJson()}        
    }

      return{ "success":false,"data":"CHANGING OF CREDENTIALS UNSUCCESSFUL" };
}  


checkEmails(body:any,id:string):boolean{
  for(const [key,user] of this.users.entries()){ 
      if((this.users.get(key).checkEmail(body))==true)  
        return true}    
       return false}

patchData(uniqueId:string,body:any):CRUDReturn{

  for(const [key,user] of this.users.entries()){  
       if((this.users.get(key).checkEmail(body))==true&&key!=uniqueId){ 
        return{"success":false, 
              "data":"email already used"}   
       }
      }    

   for(const [key,user] of this.users.entries()){
       if(key==uniqueId){
         if(this.users.get(uniqueId).valuePatch(body,uniqueId)!==1){
           return { "success": false,"data":"INVALID DATA"}}

      
       return { "success": true,      
      "data":this.users.get(uniqueId).toJson()}
    }  
      }     

       return{"success":false,
         "data":"USER DOES NOT EXIST"} 
}

deleteUserData(id:string):CRUDReturn{
  if(this.users.has(id)){
     this.users.delete(id);
        return{ "success":true,
    "data": "SUCCESSFULLY DELETED THE USER"}}

    return{"success":false,
        "data": "cant find the user"}

}

login(body:any):CRUDReturn{
  var ctr:number = 0;
  for(const [key,user] of this.users.entries()){
 
    if(this.users.get(key).loginM(body)==1){
      return {"success":true, "data": this.users.get(key).toJson()};}
  }

   return{"success":false,"data": "INVALID" 

  }
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
