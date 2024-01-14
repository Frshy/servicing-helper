import { Args, Context, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { JwtResponseModel } from './model/jwt.response.model';
import { AuthInput } from './dto/auth.input';

@Resolver((of) => JwtResponseModel)
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => JwtResponseModel)
    async signUp(
        @Args('input') input: AuthInput,
    ): Promise<JwtResponseModel> {
        return this.authService.signUp(input);
    }

    @Mutation(() => JwtResponseModel)
    async signIn(
        @Args('input') input: AuthInput,
    ): Promise<JwtResponseModel> {
        return this.authService.signIn(input);
    }

   
}