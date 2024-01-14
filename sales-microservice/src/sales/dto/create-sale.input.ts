import { Field, Float, ID, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateSaleInput {
    @Field(of => String)
    service: string

    @Field(of => Float)
    price: number;

    @Field(of => Int)
    orderedBy: number
}