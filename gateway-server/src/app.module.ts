import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { AuthContext } from './auth.context';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        playground: process.env.NODE_ENV === 'developement',
        introspection: process.env.NODE_ENV === 'developement',
        sortSchema: true,
        context: AuthContext,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'auth', url: process.env.AUTH_URL },
            { name: 'sales', url: process.env.SALES_URL },
            { name: 'finance', url: process.env.FINANCE_URL },
            { name: 'mailer', url: process.env.MAILER_URL },
          ],
        }),
        buildService({ name, url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest(options) {
              if (name != 'auth') {
                options.request.http.headers.set('user', options.context.user ? JSON.stringify(options.context.user) : null)
                options.request.http.headers.set('authorization', options.context.authorization)
              } else {
                options.request.http.headers.set('authorization', options.context.authorization)
              }

              //api keys
              switch (name) {
                case 'auth':
                  options.request.http.headers.set('x-api-key', process.env.AUTH_API_KEY)
                  break;
                case 'sales':
                  options.request.http.headers.set('x-api-key', process.env.SALES_API_KEY)
                  break;
                case 'finance':
                  options.request.http.headers.set('x-api-key', process.env.FINANCE_API_KEY)
                  break;
                case 'mailer':
                  options.request.http.headers.set('x-api-key', process.env.MAILER_API_KEY)
                  break;
              }
            },
          })
        }
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
