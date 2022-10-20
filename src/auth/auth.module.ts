import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { User } from './user.entity';

require('dotenv').config();

@Module({
    imports: [TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({}),],
    controllers: [AuthController],
    providers: [JwtStrategy],
})
export class AuthModule { }
