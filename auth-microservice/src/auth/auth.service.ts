import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs'
import { SignUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async signIn(input: SignInInput) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: input.email
            }
        });

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

    async signUp(input: SignUpInput) {
        const usernameTaken = await this.prisma.user.count({
            where: {
                username: input.username
            }
        })

        if (usernameTaken) {
            throw new ConflictException('Username is already taken!');
        }

        const emailTaken = await this.prisma.user.count({
            where: {
                email: input.email
            }
        });

        if (emailTaken) {
            throw new ConflictException('Email is already taken!');
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = bcrypt.hashSync(input.password, salt);

        const user = await this.prisma.user.create({
            data: {
                username: input.username,
                email: input.email,
                passwordHash
            }
        });

        const payload = { id: user.id };

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
