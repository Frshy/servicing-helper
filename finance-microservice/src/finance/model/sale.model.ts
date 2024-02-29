import { Directive, Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { DocumentModel } from "./document.model";

@ObjectType()
@Directive('@key(fields: "id")')
export class SaleModel {
    @Field(() => ID)
    id: number 

    @Field(() => DocumentModel, { nullable: true })
    document?: DocumentModel
}