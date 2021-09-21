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
   

    @Get('/getUser/:id')
    searchID(@Param("id") id:string){
          return this.userService.searchID(parseInt(id));
    }


    @Put('/:id')
    changeData(@Param("id") id:string, @Body() body:any){
            return this.userService.changeData(parseInt(id),body);
    }    
    
    
    @Patch('/:id')
    patchData(@Param("id") id:string, @Body() body:any){
            return this.userService.patchData(parseInt(id),body);
    }  


    @Delete('/:id')
    deleteUserData(@Param("id") id:string,){
        return this.userService.deleteUserData(parseInt(id));

    }    



    @Post('/login')
    login(@Body() body:any ){
        return this.userService.login(body);
 }

    @Post('/populate')
    populate(){
    return this.userService.populate;  


}

    @Get('/search/:term')
    search(@Param("term") term:any){
    return this.userService.search(term);
    }



}
