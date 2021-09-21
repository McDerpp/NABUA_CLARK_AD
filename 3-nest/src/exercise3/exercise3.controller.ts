import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Exercise3Service } from './exercise3.service';

@Controller('exercise3')
export class Exercise3Controller {
    constructor(private readonly e3:Exercise3Service){}

@Get('/LoopsTriangle/:height')
LoopsTriangle(@Param('height') height:string){
    var parsedHeight:number=parseInt(height);
    return this.e3.LoopsTriangle(parsedHeight);
}


@Get('/logCars')
logAllCars(){}

@Get('/PrimeNumber/:prime')
PrimeNumber(@Param('prime') prime:string){
    var primes:number=parseInt(prime);
    return this.e3.PrimeNumber(primes);
}


@Post('/addcar')
addCar(@Body() body:any ){
   return this.e3.addCar(body);
   // ; 
}


@Put('/car/:id')
getOne(@Param("id") id:string){
    return this.e3.addCar(id)
}

@Put('/replaceCar/:id')
replaceCar(@Param("id") id:string, @Body() body:any){
    return this.e3.addCar(body)
}

@Delete('/replaceCar/:id')
removeCar(@Param("id") id:string){
    return this.e3.deleteCar(id)
}


@Get('/hello/:name')
          hello(@Param('name') name:string){
          //  var testname = name;
            return this.e3.hello(name);

  }
  
}

