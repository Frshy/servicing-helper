import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { SaleModel } from "./sale.model";

@ObjectType()
@Directive('@key(fields: "id")')
export class UserModel {
    @Field(() => ID)
    id: number 

    @Field(() => [SaleModel])
    sales?: SaleModel[]
}