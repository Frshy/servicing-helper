import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { UserModel } from "./model/user.model";
import { SalesService } from "./sales.service";
import { SaleModel } from "./model/sale.model";

@Resolver((of) => UserModel)
export class UserResolver {
    constructor(private readonly salesService: SalesService) {}

    @ResolveField(() => [SaleModel])
    async sales(@Parent() user: UserModel): Promise<UserModel[]> {
        return this.salesService.forUser(+user.id);
    }
}