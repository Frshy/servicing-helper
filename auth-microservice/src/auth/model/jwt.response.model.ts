import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class JwtResponseModel {
    @Field()
    access_token: string;
}