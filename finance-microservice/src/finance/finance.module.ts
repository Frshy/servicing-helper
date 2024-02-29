import { Module } from '@nestjs/common';
import { FinanceResolver } from './finance.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { FinanceService } from './finance.service';
import { SalesResolver } from './sales.resolver';
import { EmailResolver } from './email.resolver';

@Module({
  imports: [PrismaModule],
  providers: [FinanceResolver, PrismaService, FinanceService, SalesResolver, EmailResolver],
})
export class FinanceModule {}
