import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BackendLogger } from 'common/logger/backend-logger';
import { UserService } from 'modules/user/user.service';
import { AuthReturnDto } from './dtos/authReturn.dto';
import { SignupDto } from './dtos/signup.dto';
import { IJwtPayload } from './interfaces/jwtPayload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new BackendLogger(AuthService.name);
  constructor(private readonly userService: UserService) {}

  async validateUser(payload: IJwtPayload): Promise<any> {
    const user = await this.userService.findOne(payload);
    if (!user) throw new UnprocessableEntityException('Invalid token');
    return user;
  }

  async signup(iSignup: ISignup) {
    this.logger.log(`Signup ${iSignup.email.toLowerCase()}`);

    const userCheck = await this.userService.findOne({
      email: iSignup.email,
    });
    if (userCheck) {
      throw new UnprocessableEntityException('Email already existed!');
    }
    const user = await this.userService.signup(signupDto);
    return new AuthReturnDto(user);
  }
}
