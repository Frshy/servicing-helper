import { Directive, Field, Float, ID, Int, ObjectType } from "@nestjs/graphql";
import { UserModel } from "./user.model";

@ObjectType()
@Directive('@key(fields: "id")')
export class SaleModel {
  @Field(() => Int)
  id: number;

  @Field()
  service: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  orderedBy: number;

  @Field(() => UserModel)
  user?: UserModel

  @Field()
  editedAt: Date;

  @Field()
  createdAt: Date;
}
