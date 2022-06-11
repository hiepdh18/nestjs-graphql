import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  providers: [UserResolver, UserService, UserRepository],
})
export class UserModule {}
