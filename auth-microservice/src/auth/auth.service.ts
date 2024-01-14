import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { AuthInput } from './dto/auth.input';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async signIn(input: AuthInput) {
        const user = await this.prisma.user.findUnique({
            where: {
                username: input.username
            }
        })

        if (!user) {
            throw new ForbiddenException('User with this username does not exists!')
        }

        const passwordsMatch = await bcrypt.compare(input.password, user.passwordHash)

        if (!passwordsMatch) {
            throw new ForbiddenException(
                'Incorrect password!'
            )
        }

        const payload = { id: user.id }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async signUp(input: AuthInput) {
        const usernameTaken = await this.prisma.user.count({
            where: {
                username: input.username
            }
        })

        if (usernameTaken) {
            throw new ConflictException('Username is already taken!');
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = bcrypt.hashSync(input.password, salt);

        const user = await this.prisma.user.create({
            data: {
                username: input.username,
                passwordHash
            }
        });

        const payload = { id: user.id };

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
