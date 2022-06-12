import { UseGuards } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { BackendLogger } from 'common/logger/backend-logger';
import { PubSub } from 'graphql-subscriptions';
import { Roles } from 'modules/auth/decorators/role.decorator';
import { GqlRolesGuard } from 'modules/auth/guards/graphqlRoles.guard';
import { ERole } from './../../common/constant/enums';
import { GqlAuthGuard } from './../auth/guards/graphqlAuth.guard';
import { UserReturnDto } from './dtos/userReturn.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

const pubSub = new PubSub();

@Resolver(User)
@UseGuards(GqlAuthGuard, GqlRolesGuard)
export class UserResolver {
  private logger: BackendLogger = new BackendLogger(UserResolver.name);
  constructor(private readonly userService: UserService) {}

  @Roles(ERole.USER)
  @Query(() => [User])
  getAllUsers(): Promise<UserReturnDto[]> {
    return this.userService.findAll();
  }

  // @Query(() => [User])
  // getUserByEmail(@Args('email') email: string): Promise<UserReturnDto> {
  //   return this.userService.findOne(email);
  // }

  // @Mutation(() => UserReturnDto)
  // createUser(@Args('user') user: UserCreateDto): Promise<UserReturnDto> {
  //   pubSub.publish('commentAdded', { commentAdded: 'Published!!!' });
  //   return this.userService.create(user);
  // }

  @OnEvent('user.created')
  async testEvent(payload: any) {
    return payload;
  }
  @Subscription(() => String)
  commentAdded() {
    return pubSub.asyncIterator('commentAdded');
  }
}
