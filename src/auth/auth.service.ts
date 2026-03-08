import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) { }

    // async signUp(email: string, password: string) {
    //     const hash = await bcrypt.hash(password, 10)
    //     const user = await this.userModel.create({ email: email, password: hash })
    //     return await user.save()
    // }

    async signUp(email: string, password: string) {
        const hash = await bcrypt.hash(password, 10);

        // Method 1: Using new with explicit property assignment (MOST RELIABLE)
        const user = new this.userModel();
        user.set({
            email: email,
            password: hash
        });

        const savedUser = await user.save();
        console.log('User created:', savedUser);

        const userObject = savedUser.toObject();
        return userObject;
    }


    async login(email: string, password: string) {
        const user = await this.userModel.findOne({ email })
        if (!user) {
            return null
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return null
        }

        const payload = { email: user.email, sub: user._id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
