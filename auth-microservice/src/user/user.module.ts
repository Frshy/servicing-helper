import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports: [ PrismaModule, ],
    providers: [UserResolver, UserService, PrismaService],
})
export class UserModule { }
