import { HttpException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ERole } from 'common/constant/enums';
import { BackendLogger } from 'common/logger/backend-logger';
import { SignupDto } from './../auth/dtos/signup.dto';
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
      const listUsers = [];
      return listUsers.map((user) => new UserReturnDto(user));
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async signup(signupDto: SignupDto): Promise<UserReturnDto> {
    const newUser = await this.userRepository.create(signupDto);
    await this.userRepository.addUserRole(newUser._id, ERole.USER);
    this.eventEmitter.emit('user.created', newUser);
    return new UserReturnDto(newUser);
  }

  async findOne(opts: any = {}): Promise<UserReturnDto> {
    const user = await this.userRepository.findOne(opts);
    return user ? new UserReturnDto(user) : null;
  }
}
