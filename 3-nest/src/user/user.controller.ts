import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { get } from 'http';
import { UserService } from './user.service';



@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}


    @Post('/register')
    addUser(@Body() body:any ){
        return this.userService.addUser(body);
 }

   @Get("/all")
    getAll(){
        return this.userService.getAll();
    }
   

    @Get('/:id')
    searchID(@Param("id") id:string){
           return this.userService.searchID(id);
    }


    @Put('/:id')
    changeData(@Param("id") id:string, @Body() body:any){
            return this.userService.changeData(id,body);
    }    
    
    
    @Patch('/:id')
    patchData(@Param("id") id:string, @Body() body:any){
            return this.userService.patchData(id,body);
    }  


    @Delete('/:id')    
    deleteUserData(@Param("id") id:string,){
        if(id==null){ console.log("its empty!")}
        return this.userService.deleteUserData(id);

    }    



    @Post('/login')
    login(@Body() body:any ){
        return this.userService.login(body);
 }

    @Post('/populate')
    populate(){
    return this.userService;  


}

    @Get('/search/:term')
    search(@Param("term") term:any){
    return this.userService.search(term);
    }



}
