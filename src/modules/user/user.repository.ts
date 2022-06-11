import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'common/repository/baseRepository';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import { UserCreateDto } from './dtos/userCreate.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User) private readonly userModel: ModelType<User>) {
    super(userModel);
  }
  async findOne(opts: any = {}) {
    return await this.userModel.findOne(opts);
  }

  async create(user: UserCreateDto): Promise<User> {
    this.logger.log(`Creating new user: ${user.name.toLowerCase()}`);
    console.log(user);
    const newUser = new this.userModel(user);
    return await newUser.save();
  }
}
