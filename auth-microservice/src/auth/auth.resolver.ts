import { Args, Context, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { JwtResponseModel } from './model/jwt.response.model';
import { SignUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';
import { UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from './guard/api-key.guard';

@Resolver((of) => JwtResponseModel)
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => JwtResponseModel)
    async signUp(
        @Args('input') input: SignUpInput,
    ): Promise<JwtResponseModel> {
        return this.authService.signUp(input);
    }

    @Mutation(() => JwtResponseModel)
    async signIn(
        @Args('input') input: SignInInput,
    ): Promise<JwtResponseModel> {
        return this.authService.signIn(input);
    }

   
}