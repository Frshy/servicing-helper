import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { FinanceModule } from './finance/finance.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    FinanceModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      fieldResolverEnhancers: ['guards'],
      autoSchemaFile: {
        path: join(process.cwd(), 'src/schema.gql'),
        federation: 2
      },
      playground: process.env.NODE_ENV === 'developement',
      introspection: process.env.NODE_ENV === 'developement',
      context: ({ req }) => ({ req }),
    })],
  providers: [AppService],
})
export class AppModule { }
