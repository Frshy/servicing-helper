import { Parent, Resolver, ResolveField } from "@nestjs/graphql";
import { SaleModel } from "./model/sale.model";
import { FinanceService } from "./finance.service";
import { DocumentModel } from "./model/document.model";
import { UseGuards } from "@nestjs/common";
import { ApiKeyGuard } from "./guard/api-key.guard";

@Resolver((of) => SaleModel)
export class SalesResolver {
    constructor(private readonly financeService: FinanceService) { }

    @ResolveField(() => DocumentModel)
    async document(@Parent() sale: SaleModel): Promise<DocumentModel> {
        return this.financeService.forSale(+sale.id);
    }

}