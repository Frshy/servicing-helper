import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
export class UserResponse {
  @Field(() => ID)
  id: number;

  @Field()
  username: string;

  @Field()
  admin: boolean;

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;
}