import { Query, ResolveReference, Resolver } from '@nestjs/graphql';
import { UserModel } from './model/user.model';
import { UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from './decorator/get-user.decorator';
import { UserService } from './user.service';

@Resolver((of) => UserModel)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) {}

    @UseGuards(JwtGuard)
    @Query(() => UserModel)
    async getMe(
        @GetUser() user: User
    ): Promise<UserModel> {
        return user
    }

    @ResolveReference()
    async resolveReference(reference): Promise<UserModel> {
        return this.userService.findOne(reference.id);
    }
}