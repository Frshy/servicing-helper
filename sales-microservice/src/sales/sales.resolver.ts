import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserModel } from './model/user.model';
import { SaleModel } from './model/sale.model';
import { CreateSaleInput } from './dto/create-sale.input';
import { SalesService } from './sales.service';
import { PatchSaleInput } from './dto/patch-sale.input';
import { GetUser } from './decorator/get-user.decorator';
import { AdminGuard } from './guard/admin.guard';
import { UseGuards } from '@nestjs/common';

@Resolver((of) => SaleModel)
export class SalesResolver {
    constructor(
        private readonly salesService: SalesService
    ) { }

    @UseGuards(AdminGuard)
    @Mutation(() => SaleModel)
    async createSale(
        @Args('input') input: CreateSaleInput,
    ) {
        return this.salesService.create(input);
    }

    @UseGuards(AdminGuard)
    @Query(() => SaleModel)
    async findOneSale(
        @Args('id') id: number
    ) {
        return this.salesService.findOne(id);
    }

    @UseGuards(AdminGuard)
    @Mutation(() => SaleModel)
    async deleteSale(
        @Args('id') id: number,
    ) {
        return this.salesService.delete(id);
    }

    @UseGuards(AdminGuard)
    @Mutation(() => SaleModel)
    async patchSale(
        @Args('input') input: PatchSaleInput
    ) {
        return this.salesService.patch(input);
    }

    @ResolveField(() => UserModel)
    async user(@Parent() sale: SaleModel): Promise<any> {
        return { __typename: 'User', id: sale.orderedBy };
    }
}
