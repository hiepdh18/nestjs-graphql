import { ObjectType, Field } from '@nestjs/graphql';
import { DtoMapper, MapFrom } from 'common/dto/BaseDtoMapper';
// import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserReturnDto extends DtoMapper {
  @Field()
  @MapFrom()
  _id: string;

  @Field({ nullable: true })
  @MapFrom()
  email: string;

  @Field({ nullable: true })
  @MapFrom()
  name: string;

  @Field({ nullable: true })
  @MapFrom()
  status: string;
}
