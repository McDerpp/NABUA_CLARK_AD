import { Injectable } from '@nestjs/common';
import { strictEqual } from 'assert';
import { map } from 'rxjs';
//import { Car } from 'src/exercise3/car.model';
import { User } from './user.model';

@Injectable()
export class UserService {

        private users: Map<number,User> = new Map<number,User>()

constructor(){
  console.clear();
    var populatedData = [];
this.populate();

}

populate(){
    this.users.set(1,new User(1,"James",18,"james@gmail.com","123456"));
   this.users.set(2,new User(2,"John",18,"john@gmail.com","143441"));
    this.users.set(3,new User(3,"Luke",18,"luke@gmail.com","654321"));
    this.users.set(4,new User(4,"Judas",18,"judas@gmail.com","696969"));
   
 
    
            }


getAll(){
var populatedData = [];
for(const user of this.users.values()){
    populatedData.push(user.toJson())
}
return console.log(populatedData);

}

searchID(id:number){
if(this.users.has(id)){
  console.log('User found');
  return console.log(this.users.get(id));
}

else{ 
  console.log('User does not exist');
}
  
}



addUser(body:any){
     var newUser : User;
     newUser=new User(body?.id,body?.name,body?.age,body?.email,body?.password);     
     this.users.set(body.id,newUser);

     console.log(`Succesfully registered`);
            }   
          

changeData(id:number,body:any){
 this.users.get(id).changeData(id,body);
  }
 


patchData(id:number,body:any){
  if(this.users.has(id)){
    this.users.get(id).patchValue(body);
  }
 
else console.log('ID number does not exist')
 
    
}

deleteUserData(id:number){
if(this.users.has(id)){
  this.users.delete(id);
 return console.log("successfully deleted the user data...");

}
else
return console.log("User data does not exist...")


}

login(body:any){
  for(const [key,car] of this.users.entries()){
 return this.users.get(key).loginM(body?.email,body?.password);
}

}


search(search:any){
  for(const [key,car] of this.users.entries()){
     this.users.get(key).checkValue(search);
 }


}



}
