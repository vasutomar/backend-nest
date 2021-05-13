import {Injectable} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

    constructor(private readonly userRepository: UserRepository){}

    addUser(username : string, password: string): Promise<User> {
        return this.userRepository.create({
            username,
            password
        })
    }

    getOne(username: string) : Promise<User> {
        return this.userRepository.findOne({
            username
        })
    }

    getAll() : Promise<User[]> {
        return this.userRepository.find({});
    }

    validateUser(username:string, password:string) : Promise<{message : string}> {
        return this.userRepository.validate(username,password);
    }
}