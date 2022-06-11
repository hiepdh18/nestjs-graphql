import { HttpException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BackendLogger } from 'common/logger/backend-logger';
import { UserCreateDto } from './dtos/userCreate.dto';
import { UserReturnDto } from './dtos/userReturn.dto';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
  private readonly logger = new BackendLogger(UserService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private eventEmitter: EventEmitter2,
  ) {}
  async findAll(): Promise<UserReturnDto[]> {
    try {
      const listUser = await this.userRepository.findOne();
      this.logger.log('here');
      console.log(listUser);
      const listUsers = [];
      return listUsers.map((user) => new UserReturnDto(user));
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async create(user: UserCreateDto): Promise<UserReturnDto> {
    const newUser = await this.userRepository.create(user);
    this.eventEmitter.emit('user.created', newUser);
    return new UserReturnDto(newUser);
  }
}
