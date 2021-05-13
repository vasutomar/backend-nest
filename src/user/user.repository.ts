import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { create } from "eslint/lib/rules/*";
import { FilterQuery,Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserRepository {
    
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
        return this.userModel.findOne(userFilterQuery);
    }

    async find(usersFilterQuery: FilterQuery<User []>) {
        return this.userModel.find(usersFilterQuery);
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async validate(name: string,pass:string) : Promise<{message : string}> {
        const searchedUser = this.userModel.findOne({
            username : name
        })

        try {
            if((await searchedUser).password == pass) {
                return {message: "Verified"};
            } else {
                return {message: "Incorrect Password"};
            }
        } catch(error) {
            return {message: "User not found"}
        }
    }
}
