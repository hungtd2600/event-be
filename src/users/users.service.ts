import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}
  async createUser(username: string, password: string) {
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) return { message: 'Username already exists' };
    const newUserId = uuidv4();
    const newUser = this.userModel.create({
      username,
      password,
      id: newUserId,
    });
    return newUser;
  }
  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }
}
