import { Args, Query, ResolveReference, Resolver } from '@nestjs/graphql';
import { UserModel } from './model/user.model';
import { UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from './decorator/get-user.decorator';
import { UserService } from './user.service';
import { AdminGuard } from 'src/auth/guard/admin.guard';
import { ApiKeyGuard } from 'src/auth/guard/api-key.guard';

@Resolver((of) => UserModel)
@UseGuards(JwtGuard)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Query(() => UserModel)
    async getMe(
        @GetUser() user: User
    ): Promise<UserModel> {
        return user
    }

    @UseGuards(AdminGuard)
    @Query(() => UserModel)
    async findOne(
        @Args('id') id: number
    ) {
        return this.userService.findOne(id);
    }

    @UseGuards(AdminGuard)
    @Query(() => [UserModel])
    async findAll() {
        return this.userService.findAll();
    }

    @UseGuards(AdminGuard)
    @Query(() => UserModel)
    async deleteUser(
        @Args('id') id: number
    ) {
        return this.userService.deleteUser(id);
    }

    @ResolveReference()
    async resolveReference(reference): Promise<UserModel> {
        return this.userService.findOne(reference.id);
    }
}