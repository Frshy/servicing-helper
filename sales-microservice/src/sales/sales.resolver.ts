import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserModel } from './model/user.model';
import { SaleModel } from './model/sale.model';
import { CreateSaleInput } from './dto/create-sale.input';
import { SalesService } from './sales.service';
import { PatchSaleInput } from './dto/patch-sale.input';

@Resolver((of) => SaleModel)
export class SalesResolver {
    constructor(
        private readonly salesService: SalesService
    ) { }


    /*
    !!! TODO: ADMIN GUARD (user object is sent in the header) !!!
    */

    @Mutation(() => SaleModel)
    async createSale(
        @Args('input') input: CreateSaleInput,
    ) {
        return this.salesService.create(input);
    }

    @Query(() => SaleModel)
    async findOneSale(
        @Args('id') id: number
    ) {
        return this.salesService.findOne(id);
    }

    @Mutation(() => SaleModel)
    async deleteSale(
        @Args('id') id: number,
    ) {
        return this.salesService.delete(id);
    }

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
