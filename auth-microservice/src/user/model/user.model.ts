import { Directive, Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
export class UserModel {
  @Field(() => ID)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  admin: boolean;

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;
}