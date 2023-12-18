import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
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