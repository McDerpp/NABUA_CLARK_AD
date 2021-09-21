export class User{
   private id:number;
    private name:string;
    private age:number;
    private email:string;
    private password:string;

    constructor(id:number,name:string,age:number,email:string,password:string){
     this.id=id;
     this.name=name;
     this.age=age;
     this.email=email;
     this.password=password;

    }

    loginM(email:string, password:string){
        if(this.email==email&&this.password==password){ 
                console.log('LogIn successful');

        }
        else
        console.log('credentials invalid');

       
    }

    changeData(id:number,body:any){
        if(body.hasOwnProperty("name"&&"age"&&"email"&&"password")){
         
          
          this.name= body?.name;
          this.age= body?.age;
          this.email= body?.email; 
          this.password= body?.password; 
        return  console.log('Data is complete...Replacing data complete');

        }
       
      else
      return console.log('incomplete data...cannot proceed to changing data');
      
      
      }


    

    checkValue(check:any){
 
     
       if(check.toUpperCase() == this.email.toUpperCase()){
           return console.log(`found the value (${check}) in [email] at userID:  ${this.name}`);
     }

       if(check == this.age){
        return console.log(`found the value (${check}) in [age] at userID:  ${this.name}`);
    }

        if(check == this.id){
        return console.log(`found the value (${check}) in [ID] at userID:  ${this.name}`);
    }

        if(check.toUpperCase() == (this.name=this.name.toUpperCase())){
            return console.log(`found the value (${check}) in [name] at userID:  ${this.id}`);
         
    }   

    

    }

    patchValue(body:any){
        
       if(body.hasOwnProperty("name"||"age"||"email"||"password")){
        if(body!= (this.email=this.email.toUpperCase())){
            this.email= body?.email;
        }

        if(body!= (this.name=this.name.toUpperCase())){
         this.name= body?.name;
        }

        if(body!= (this.age=this.age)){
            this.age= body?.age;
        }

         if(body!= (this.id=this.id)){
        this.id= body?.id;
        }
        console.log('Successfully updated');
    }

    else
    console.log('INVALID TERM/S');

       
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