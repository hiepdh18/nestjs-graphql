import { Field, ObjectType } from '@nestjs/graphql';
import { prop } from '@typegoose/typegoose';
import { DEFAULT_USER_NAME } from 'common/constant/constants';
import { Typegoose } from 'typegoose';

@ObjectType()
export class User extends Typegoose {
  @Field()
  _id: string;

  @prop({ required: true })
  @Field()
  email: string;

  @prop({ required: true })
  @Field()
  password: string;

  @prop({ default: DEFAULT_USER_NAME })
  @Field({ nullable: true })
  name: string;

  // @prop({ default: [] })
  // @Field(() => [Role], { defaultValue: [] })
  // roles: Role[];
}

export const UserModel = new User().getModelForClass(User);
