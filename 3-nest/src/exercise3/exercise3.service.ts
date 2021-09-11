import { Injectable } from '@nestjs/common';

@Injectable()
export class Exercise3Service {

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



}
