import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { AuthContext } from './auth.context';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        playground: true,
        sortSchema: true,
        introspection: true,
        context: AuthContext,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'auth', url: 'http://localhost:3000/graphql' },
        //    { name: 'sales', url: 'http://localhost:3001/graphql' },
          ],
        }),
        buildService({ name, url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest(options) {
              if (name == 'auth'){
                options.request.http.headers.set('authorization', options.context.authorization)
              }else {
                options.request.http.headers.set('user', options.context.user ? JSON.stringify(options.context.user) : null)
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
