import { createParamDecorator } from '@nestjs/common';
import { GraphQLExecutionContext } from '@nestjs/graphql';

export const GetAuthorization = createParamDecorator(
  (_data: any, ctx: GraphQLExecutionContext) => {
    try {
      const headers = ctx.getArgs()[2].req.headers;
      if (headers.authorization) {
        return headers.authorization;
      }
    } catch (err) {
      return null;
    }
  },
);