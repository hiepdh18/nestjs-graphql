import { Field, ObjectType } from '@nestjs/graphql';
import { prop } from '@typegoose/typegoose';
import { IsEmail } from 'class-validator';
import { DEFAULT_USER_NAME } from 'common/constant/constants';
import { EUserStatus } from 'common/constant/enums';
import { Typegoose } from '@hasezoey/typegoose';
import { Role } from './role.schema';
import mongoose from 'mongoose';

@ObjectType()
export class User extends Typegoose {
  @Field()
  _id: string;

  @prop()
  @Field()
  @IsEmail()
  email: string;

  @prop()
  @Field()
  password: string;

  @prop({ default: DEFAULT_USER_NAME })
  @Field({ nullable: true })
  name: string;

  @prop({ default: null })
  @Field({ defaultValue: null })
  avatarUrl: string;

  @prop({ type: mongoose.Schema.Types.Mixed, default: [] })
  @Field(() => [Role], { defaultValue: [] })
  roles: Role[];

  @prop({ default: EUserStatus.VERIFY_MAIL })
  @Field()
  status: string;

  @prop({ default: null })
  @Field()
  verificationToken: string;

  @prop({ default: new Date() })
  @Field()
  updatedAt: Date;

  @prop({ default: new Date() })
  @Field()
  createdAt: Date;
}

export const UserModel = new User().getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
