import { Parent, Resolver, ResolveField } from "@nestjs/graphql";
import { SaleModel } from "./model/sale.model";
import { FinanceService } from "./finance.service";
import { DocumentModel } from "./model/document.model";
import { EmailModel } from "./model/email.model";
import { UseGuards } from "@nestjs/common";
import { ApiKeyGuard } from "./guard/api-key.guard";

@Resolver((of) => EmailModel)
export class EmailResolver {
    constructor(private readonly financeService: FinanceService) { }

    @ResolveField(() => DocumentModel)
    async document(@Parent() email: EmailModel): Promise<DocumentModel> {
        return this.financeService.forEmail(+email.id);
    }

}