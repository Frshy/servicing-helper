import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModel } from './model/user.model';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async findOne(id: number) : Promise<UserModel> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: +id /*delete : +id when types are fixed*/
            }
        });

        if (!user) {
           throw new NotFoundException('There is no user with such id!');
        }

        delete user.passwordHash;

        return user;
    }

    async findAll() : Promise<UserModel[]> {
        const users = await this.prisma.user.findMany();
        return users;
    }

    async deleteUser(id: number) : Promise<UserModel> {
        const deletedUser = await this.prisma.user.delete({
            where: { id }
        });

        return deletedUser;
    }
}
