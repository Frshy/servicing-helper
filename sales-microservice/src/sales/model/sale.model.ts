import { Directive, Field, Float, ID, Int, ObjectType } from "@nestjs/graphql";
import { UserModel } from "./user.model";

@ObjectType()
@Directive('@key(fields: "id")')
export class SaleModel {
  @Field(() => ID)
  id: number;

  @Field()
  service: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  orderedBy: number;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel | null

  @Field()
  editedAt: Date;

  @Field()
  createdAt: Date;
}
