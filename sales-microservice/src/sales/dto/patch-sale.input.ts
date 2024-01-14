import { Field, Float, ID, InputType, Int } from "@nestjs/graphql";

@InputType()
export class PatchSaleInput {
    @Field(of => Int)
    id: number

    @Field(of => String, { nullable: true })
    service?: string

    @Field(of => Float, { nullable: true })
    price?: number;

    @Field(of => Int, { nullable: true })
    orderedBy?: number
}