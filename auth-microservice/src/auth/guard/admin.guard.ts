import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GraphQLExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(ctx: GraphQLExecutionContext): boolean {
        try {
            const request = ctx.getArgs()[2].req;
            const user = request.user;

            return user?.admin;
        } catch (err) {
            return false;
        }
    }
}