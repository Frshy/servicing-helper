import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GraphQLExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(ctx: GraphQLExecutionContext): boolean {
        try {
            const headers = ctx.getArgs()[2].req.headers;
            if (headers.user) {
                return JSON.parse(headers.user).admin;
            }
        } catch (err) {
            return false;
        }
    }
}