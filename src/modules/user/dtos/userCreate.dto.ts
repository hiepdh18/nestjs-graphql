import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class UserCreateDto {
  @Field()
  email: string;

  @IsAlpha()
  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  rePassword: string;
}
