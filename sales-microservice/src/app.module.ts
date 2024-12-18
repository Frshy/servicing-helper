import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalesModule } from './sales/sales.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    SalesModule,
    PrismaModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
