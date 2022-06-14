import { prop, Typegoose } from '@hasezoey/typegoose';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Role extends Typegoose {
  @Field()
  _id: string;

  @prop()
  @Field()
  name: string;

  @prop()
  @Field()
  // @Authorized([roles.ADMIN])
  enabled: boolean;
}

export const RoleModel = new Role().getModelForClass(Role, {
  schemaOptions: { timestamps: true },
});
