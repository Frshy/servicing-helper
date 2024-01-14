import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async findOne(id: number) : Promise<User> {
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
}
