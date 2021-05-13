import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from "./schemas/user.schema";

@Controller('authentication')
export class UserController {
    
    constructor(private readonly userService: UserService) {}

    @Get()
    testEndpoint() : string {
        return "Working";
    }

    @Post('signup')
    signupEndpoint(@Body('username') username: string, @Body('password') password: string) : Promise<User> {
        return this.userService.addUser(username,password);
    }

    @Get('all')
    returnAll() : Promise<User[]> {
        return this.userService.getAll();
    }

    @Post('signin') 
    signinEndpoint(@Body('username')username: string, @Body('password')password: string) :Promise<{message : string}> {
        return this.userService.validateUser(username,password);
    }
}