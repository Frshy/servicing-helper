import { Query, Resolver, ResolveField, Parent, Args, Mutation, ResolveReference } from '@nestjs/graphql';
import { DocumentModel } from './model/document.model';
import { SaleModel } from './model/sale.model';
import { FinanceService } from './finance.service';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from './guard/admin.guard';
import { GetAuthorization } from './decorator/get-authorization.decorator';
import { EmailModel } from './model/email.model';
import { GetUser } from './decorator/get-user.decorator';
import { ApiKeyGuard } from './guard/api-key.guard';

@Resolver((of) => DocumentModel)
export class FinanceResolver {
    constructor(private readonly financeService: FinanceService) { }

    @UseGuards(AdminGuard)
    @Mutation(() => DocumentModel)
    async createDocument(
        @Args('saleId') id: number,
        @GetAuthorization() authorization: string,
        @GetUser() user: any
    ) {
        return this.financeService.createDocument(id, authorization, user);
    }

    @UseGuards(AdminGuard)
    @Mutation(() => DocumentModel)
    async deleteDocument(
        @Args('id') id: number
    ) {
        return this.financeService.deleteDocument(id);
    }

    @UseGuards(AdminGuard)
    @Query(() => [DocumentModel])
    async getAllDocuments() {
        return this.financeService.findAll();
    }

    @UseGuards(AdminGuard)
    @Query(() => DocumentModel)
    async findOneDocument(
        @Args('id') id: number
    ) {
        return this.financeService.findOne(id);
    }

    @ResolveField(() => SaleModel)
    async sale(@Parent() document: DocumentModel): Promise<any> {
        return { __typename: 'Sale', id: document.saleId };
    }

    @ResolveField(() => EmailModel)
    async email(@Parent() document: DocumentModel): Promise<any> {
        return { __typename: 'Email', id: document.emailId };
    }
}
