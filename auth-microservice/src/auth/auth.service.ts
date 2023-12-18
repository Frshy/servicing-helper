import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async signIn(username: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                username
            }
        })

        if (!user) {
            throw new ForbiddenException('User with this username does not exists!')
        }

        const passwordsMatch = await bcrypt.compare(password, user.passwordHash)

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

    async signUp(username: string, password: string) {
        const usernameTaken = await this.prisma.user.count({
            where: {
                username
            }
        })

        if (usernameTaken) {
            throw new ConflictException('Username is already taken!');
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = bcrypt.hashSync(password, salt);

        const user = await this.prisma.user.create({
            data: {
                username,
                passwordHash
            }
        });

        const payload = { id: user.id };

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}
