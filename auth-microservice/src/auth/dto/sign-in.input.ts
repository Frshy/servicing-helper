import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

@InputType()
export class SignInInput {
    @Field(of => String)
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @Field(of => String)
    @IsNotEmpty()
    @IsString()
    @Length(5, 50)
    password: string;
}