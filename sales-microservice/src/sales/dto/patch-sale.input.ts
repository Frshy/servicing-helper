import { Field, Float, ID, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class PatchSaleInput {
    @IsNumber()
    @IsNotEmpty()
    @Field(of => Int)
    id: number

    @IsString()
    @Field(of => String, { nullable: true })
    service?: string

    @IsNumber()
    @Field(of => Float, { nullable: true })
    price?: number;

    @IsNumber()
    @Field(of => Int, { nullable: true })
    orderedBy?: number
}