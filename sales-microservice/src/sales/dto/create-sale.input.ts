import { Field, Float, ID, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateSaleInput {
    @Field(of => String)
    @IsString()
    @IsNotEmpty()
    service: string

    @IsNumber()
    @IsNotEmpty()
    @Field(of => Float)
    price: number;

    @IsNumber()
    @IsNotEmpty()
    @Field(of => Int)
    orderedBy: number
}