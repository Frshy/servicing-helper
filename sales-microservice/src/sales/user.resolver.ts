import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { UserModel } from "./model/user.model";
import { SalesService } from "./sales.service";
import { SaleModel } from "./model/sale.model";
import { GetUser } from "./decorator/get-user.decorator";
import { UseGuards } from "@nestjs/common";
import { ApiKeyGuard } from "./guard/api-key.guard";

@Resolver((of) => UserModel)
export class UserResolver {
    constructor(private readonly salesService: SalesService) {}

    @ResolveField(() => [SaleModel])
    async sales(@Parent() user: UserModel): Promise<SaleModel[]> {
        return this.salesService.forUser(+user.id);
    }
}