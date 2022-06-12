import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@ArgsType()
export class SignupDto {
  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  @IsString()
  password: string;
}
