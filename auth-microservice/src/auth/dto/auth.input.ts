import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AuthInput {
    //(maybe) todo: validation decorators
    @Field(of => String)
    username: string;

    @Field(of => String)
    password: string;
}