import { Controller, Get, Param } from '@nestjs/common';
import { Exercise3Service } from './exercise3.service';

@Controller('exercise3')
export class Exercise3Controller {
    constructor(private readonly e3:Exercise3Service){}

@Get('/LoopsTriangle/:height')
LoopsTriangle(@Param('height') height:string){
    var parsedHeight:number=parseInt(height);
    return this.e3.LoopsTriangle(parsedHeight);
}


@Get('/PrimeNumber/:prime')
PrimeNumber(@Param('prime') prime:string){
    var primes:number=parseInt(prime);
    return this.e3.PrimeNumber(primes);
}



@Get('/hello/:name')
          hello(@Param('name') name:string){
          //  var testname = name;
            return this.e3.hello(name);

  }
}


