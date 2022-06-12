import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BackendLogger } from 'common/logger/backend-logger';
import { AuthService } from './auth.service';
import { AuthReturnDto } from './dtos/authReturn.dto';
import { SignupDto } from './dtos/signup.dto';

@Resolver('Auth')
export class AuthResolver {
  private readonly logger = new BackendLogger(AuthResolver.name);
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthReturnDto)
  async signup(@Args() signupDto: SignupDto) {
    return await this.authService.signup(signupDto);
  }
}
