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

  async create(userCreateDto: UserCreateDto): Promise<User> {
    this.logger.log(`Creating new user: ${userCreateDto.email.toLowerCase()}`);
    const newUser = new this.userModel(userCreateDto);
    return await newUser.save();
  }
}
