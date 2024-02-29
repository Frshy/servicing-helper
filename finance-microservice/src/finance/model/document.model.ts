import { Directive, Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { SaleModel } from "./sale.model";
import { EmailModel } from "./email.model";

@ObjectType()
@Directive('@key(fields: "id")')
export class DocumentModel {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  saleId: number;

  @Field(() => Int)
  emailId: number;

  @Field()
  documentUrl: string;

  @Field(() => SaleModel, { nullable: true })
  sale?: SaleModel

  @Field(() => EmailModel, { nullable: true })
  email?: EmailModel

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;
}