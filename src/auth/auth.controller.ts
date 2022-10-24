import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Req, SetMetadata, UnauthorizedException, UseGuards, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Public } from './jwt-auth.guard';
import { CreateUserDto } from './auth.validations';

require('dotenv').config();
const bcrypt = require('bcrypt');

const accessTokenOptions = {
  expiresIn: '15m',
  secret: process.env["JWT_ACCESS_TOKEN_SECRET"]
}

const refreshTokenOptions = {
  expiresIn: '7d',
  secret: process.env["JWT_REFRESH_TOKEN_SECRET"]
}

@Controller('auth')
export class AuthController {


  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  @Public()
  @Post('login')
  async login(@Req() request: Request): Promise<object> {
    const user = await this.userRepository.findOne({ where: { email: request.body.email } });

    if (user && await bcrypt.compare(request.body.password, user.password)) {
      const data = { email: user.email, id: user.id }

      const refreshToken = this.jwtService.sign(data, refreshTokenOptions)
      user.refresh_token = await bcrypt.hash(refreshToken, 10);
      await this.userRepository.save(user);

      return {
        access_token: this.jwtService.sign(data, accessTokenOptions),
        refresh_token: refreshToken,
        email: user.email,
        id: user.id
      };

    } else {
      throw new UnauthorizedException();
    }
  }

  @Public()
  @Post('signin')
  async signin(@Body() body: CreateUserDto): Promise<object> {
    const user = await this.userRepository.findOne({ where: { email: body.email } });
    if (user) {
      throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
    } else {
      const res = await this.userRepository.insert(
        new User(
          body.email,
          await bcrypt.hash(body.password, 10),
          body["name"]
        ));
      return {
        message: "User created",
      };
    }
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() body): Promise<object> {
    const refreshToken = body.refresh_token;

    const decoded = this.jwtService.decode(refreshToken);
    if (!decoded) {
      throw new Error();
    }

    const user = await this.userRepository.findOne({ where: { email: decoded["email"] } });
    if (!user || !user.refresh_token) {
      throw new HttpException('User or token does not exist', HttpStatus.NOT_FOUND);
    }

    const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.refresh_token);
    if (!isRefreshTokenMatching) {
      throw new UnauthorizedException('Invalid token');
    }
    try {
      await this.jwtService.verifyAsync(refreshToken, refreshTokenOptions);

      const data = { email: user.email, id: user.id }
      return {
        access_token: this.jwtService.sign(data, accessTokenOptions),
        email: user.email
      };

    } catch (e) {
      throw new UnauthorizedException("Invalid token");
    }

  }


  @Delete('logout')
  logout(@Req() request: Request): object {
    this.userRepository.update(request.user["id"], { refresh_token: null });
    return {
      message: 'User logged out',
    };
  }
}
