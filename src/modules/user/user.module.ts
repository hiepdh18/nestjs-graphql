import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Role } from './schemas/role.schema';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypegooseModule.forFeature([User, Role])],
  providers: [UserResolver, UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
