import { Module } from '@nestjs/common';
import { SalesResolver } from './sales.resolver';
import { SalesService } from './sales.service';
import { UserResolver } from './user.resolver';

@Module({
  providers: [SalesResolver, SalesService, UserResolver]
})
export class SalesModule {}
