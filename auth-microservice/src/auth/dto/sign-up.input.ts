import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

@InputType()
export class SignUpInput {
    @Field(of => String)
    @IsNotEmpty()
    @IsString()
    @Length(5, 50)
    username: string;

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