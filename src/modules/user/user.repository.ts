import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { BaseRepository } from 'common/repository/baseRepository';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import { SignupDto } from './../auth/dtos/signup.dto';
import { Role } from './schemas/role.schema';
import { User } from './schemas/user.schema';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(User) private readonly userModel: ModelType<User>,
    @InjectModel(Role) private readonly roleModel: ModelType<Role>,
  ) {
    super(userModel);
  }

  async create(signupDto: SignupDto): Promise<User> {
    this.logger.log(`Creating new user: ${signupDto.email.toLowerCase()}`);
    const passwordHash = await this.passwordHash(signupDto.password);
    signupDto.password = passwordHash;
    const newUser = new this.userModel(signupDto);
    return await newUser.save();
  }

  async addUserRole(userId: string, roleName: string) {
    const user = await this.findOneById(userId);

    // Only add the role if the user doesn't already have it
    const existingRole =
      user.roles && user.roles.find((role) => role.name === roleName);
    if (existingRole) {
      this.logger.log(`User: ${user.email} already has role: ${roleName}`);
      existingRole.enabled = true;
      user.markModified('roles');
      return await user.save();
    }

    user.roles.push(new this.roleModel({ name: roleName, enabled: true }));
    user.markModified('roles');
    return await user.save();
  }
  async passwordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
