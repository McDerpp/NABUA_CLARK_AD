import { Car } from './car.model';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.model';

@Injectable()
export class Exercise3Service {

    private cars:Map<string,Car>=new Map<string,Car>();

    addCar(car:any){
        var newCar : Car;
        newCar=new Car(car?.model,car?.color,{name:car?.wheels.name,radius:car.wheels.radius});
        this.cars.set(car.id,newCar);
        this.logAllCars();
        }
    


    addNabuaCar(){
        var nabuaCar : Car;
        nabuaCar=new Car("Goodyear ","Red",{name:"Goodyear",radius:18});
        this.cars.set("nabua",nabuaCar);
        this.logAllCars();
        }

   LoopsTriangle(height:number){
 
    for (let x = 0; x < height; x++) {
        for (let y = 0; y <= x - 1; y++) {
            process.stdout.write("*");
    
        }
        console.log("*");
    }
    return;
}

PrimeNumber(prime:number){
 
    for (let x = 2; x < prime; x++) {
        if (prime % x == 0) {
            console.log("testingPrime");
            return (prime + " is not a prime number");
          
            break;
        } else {
            console.log("testingNotPrime");
            return( prime + " is a prime number");

            break;
        }
    }
    return;
}



hello(names:string){
    console.log("test");
    return "Hi there " + names;
}


replaceCar(id:string,car:any){
    var newCar : Car;
    newCar=new Car(car?.model,car?.color,{name:car?.wheels.name,radius:car.wheels.radius});
    this.cars.set(car.id,newCar);
    this.logAllCars();

}

deleteCar(id:string){
if(this.cars.has(id))
this.cars.delete(id);
else console.log(id+" does not exist in databaase!");

}





logAllCars(){
for(const [key,car] of this.cars.entries()){
console.log(key);
    car.log();
   
}
}


}
