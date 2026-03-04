import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async createUser(): Promise<User> {
        try {
            const newUser = new this.userModel({
                name: "Mahaboob",
                address: {
                    street: "hsr layout",
                    city: "bangalore"
                }
            })

            return await newUser.save()
        } catch (error) {
            return error.message
        }
    }

    async findUser(): Promise<User[]> {
        return this.userModel.find().exec()
    }
}
