import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) { }
    async createUser(username: string, _password: string): Promise<{
        password?: string;
        message?: string;
        username?: string
    }> {
        const existingUser = await this.userModel.findOne({ username });
        if (existingUser) return { message: "Username already exists" }
        return this.userModel.create({
            username,
            message: "User created successfully"
        });
    }
    async getUser(query: object ): Promise<User> {
        return this.userModel.findOne(query);
    }
}