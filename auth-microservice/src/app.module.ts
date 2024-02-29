import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { AuthResolver } from './auth/auth.resolver';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { JwtGuard } from './auth/guard/jwt.guard';
import { UserService } from './user/user.service';
import { UserResolver } from './user/user.resolver';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      fieldResolverEnhancers: ['interceptors', 'guards', 'filters'],
      autoSchemaFile: {
        path: join(process.cwd(), 'src/schema.gql'),
        federation: 2
      },
      playground: process.env.NODE_ENV === 'developement',
      introspection: process.env.NODE_ENV === 'developement',
      context: ({ req }) => ({ req }),
    }),
    AuthModule,
    JwtModule,
    UserModule
  ],
  providers: [AppService, AuthResolver, AuthService, JwtStrategy, JwtGuard, UserService, UserResolver],
})
export class AppModule { }
