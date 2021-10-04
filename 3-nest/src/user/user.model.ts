import { ConsoleLogger, Get } from "@nestjs/common";
import { stringify } from "uuid";
import { Helper } from "./helper";

export class User {
   private id:string;
    private name:string;
    private age:number;
    private email:string;
    private password:string;

    constructor(name: string, age: number, email: string, password: string){
     this.id = Helper.generateUID();
     this.name=name;
     this.age=age;
     this.email=email;
     this.password=password;

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
       
    
    log(){
        console.log(`${this.id}; ${this.name} ${this.age}
         ${this.email} ${this.password}`)};     

    toJson(){
        return{ 
          id:this.id,
          name:this.name, 
          age:this.age,
          email:this.email           
           
        }
    }
}