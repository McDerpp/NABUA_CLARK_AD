import { ConsoleLogger, Get } from "@nestjs/common";
import { stringify } from "uuid";
import { Helper } from "./helper";
import * as admin from 'firebase-admin';
import { resourceLimits } from "worker_threads";
import { CRUDReturn } from "./return";

export class User {
   private id:string;
    private name:string;
    private age:number;
    private email:string;
    private password:string;
   private DB = admin.firestore();

    constructor(name: string, age: number, email: string, password: string,id?:string){
   if(id!=undefined)
     this.id = id;
     else this.id=Helper.generateUID();
     this.name=name;
     this.age=age;
     this.email=email;
     this.password=password;

    }


   static async retrieve(id:string):Promise<User>{
      try{
   var DB = admin.firestore();
   var result = await DB.collection("users").doc(id).get();
   if(result.exists){
      var data = result.data();

      return new User(        
         data['name'],
         data['age'],
         data['email'],
         data['password'],
         result.id);

   }
}catch(error){
   console.log(error);
   return null;
}
    }


async commit():Promise<CRUDReturn>{
   try{
      var DB = admin.firestore();
     // var result = await DB.collection("users").doc(this.id).set(this.toJson());
      var result = await DB.collection("users").doc(this.id).set(this.toJsonPassword);
     
      return{
         success:true,
         data:this.toJson()
      }
   }catch(error){
      console.log(error);
      return {
         success:false,
         data:error
      }
   }   
   }





    getId(){return this.id}
    setId(id:string ){this.id=id;}

    setEmail(email:string ){this.email=email;}
     getEmail(){return this.email;}

     setName(name:string ){this.name=name;}
     getName(){return this.id;}

     setAge(age:number ){this.age=age;}
     getAge(){return this.age;}

     setPassword(password:string ){this.password=password;}
     getPassord(){return this.password;}

    

    loginM(body:any){
       var ctr:number =1;
        if(body?.email == this.email &&body?.password==this.password){ 
          return ctr;
                }                  
    }

    checkEmail(body:any):boolean{ 
         if(body.email == this.email)
           return true;              
     }


    putData(body:any){
        if(body?.hasOwnProperty("name")&&
        body?.hasOwnProperty("age")&&
        body?.hasOwnProperty("email")&&
        body?.hasOwnProperty("password")){            
          this.name= body?.name;  
          this.age= body?.age;
          this.email= body?.email; 
          this.password= body?.password; 

            return  console.log('Data is complete...Replacing data complete');
        } 
           else return console.log('incomplete data...cannot proceed to changing data');            
      }


    checkValue(check:any):boolean{
       var ctr:number=1;       
       if(check.toUpperCase() == this.email.toUpperCase()||
        check == this.age||
        check == this.id||
        check.toUpperCase() == (this.name.toUpperCase())){return true;}
           else return false;
     }
     
    valuePatch(body:any,uniqueId:string){   
      var ctr:number=1;
       this.setId(uniqueId);
       console.log(typeof this.email);
  
      if(body.hasOwnProperty("email")){if(typeof body?.email==="string")
       this.setEmail(body?.email); 
          else ctr++;}
      
      if(body.hasOwnProperty("name")){if(typeof body?.name==="string")
        this.setName(body?.name); 
           else ctr++;}    

      if(body.hasOwnProperty("age")){if(typeof body?.age==="number")
         this.setAge(body?.age); 
         else ctr++;}
 
      if(body.hasOwnProperty("password")){if(typeof body?.password==="string")
         this.setPassword(body?.password); 
         else ctr++;}
      
            return ctr;
    }


    async patch(id:string,body:any){

      var ctr:number=1;
      this.setId(id);
      console.log(typeof this.email);
 
   
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
    
        }
    
      }
      


    }
       
    
    log(){
        console.log(`${this.id}; ${this.name} ${this.age}
         ${this.email} ${this.password}`)};     

    toJson(){
        return{ 
        
          name:this.name, 
          age:this.age,
          email:this.email           
           
        }
    }


    toJsonPassword(){
      return{ 
      
        name:this.name, 
        age:this.age,
        email:this.email , 
        password:this.password           
         
      }
  }


    toJsonId(){
      return{ 
       id:this.id,
        name:this.name, 
        age:this.age,
        email:this.email           
         
      }
  }
}