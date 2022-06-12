import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BackendLogger } from 'common/logger/backend-logger';
import { UserService } from 'modules/user/user.service';
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
}
