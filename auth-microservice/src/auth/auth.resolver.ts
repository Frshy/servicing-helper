import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './response/auth.response';
import { User } from '@prisma/client';
import { UserResponse } from './response/user.response';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from './guard/jwt.guard';
import { GetUser } from './decorator/get-user.decorator';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Query(() => String)
    witajSwiecie() {
        return 'Lorem Ipsum ZGlkbnQgZXhwZWN0IHRoYXQgaWYgaSBkb250IHNldCByYW0gYWxsb2NhdGlvbiBsaW1pdCBpbiB3c2wncyBjb25maWcgZmlsZSB3aGljaCBkaWRudCBldmVuIGV4aXN0IG9uZSBkb2NrZXIncyBjb250YWluZXIgd291bGQgdXNlIDEwZ2Igb2YgcmFtIGNhc3VpbmcgbXkgcGMgKGFuZCBteSBtZW50YWwpIGNyYXNoaW5n';
    }

    @Mutation(() => AuthResponse)
    async signUp(
        @Args('username') username: string,
        @Args('password') password: string,
    ): Promise<AuthResponse> {
        return this.authService.signUp(username, password);
    }

    @Mutation(() => AuthResponse)
    async signIn(
        @Args('username') username: string,
        @Args('password') password: string,
    ): Promise<AuthResponse> {
        return this.authService.signIn(username, password);
    }

    @UseGuards(JwtGuard)
    @Query(() => UserResponse)
    async getMe(
        @GetUser() user: User
    ): Promise<UserResponse> {
        return user
    }
}