import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { UserRow } from '../../users/types';
import { AuthService } from '../services';
import { RegisterDto } from '../dto';
import { AuthenticatedGuard } from '../guards';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post('sign-in')
  @UseGuards(AuthGuard('local'))
  signInByPassword(@Req() req: Request) {
    const user = req.user as UserRow;

    return new Promise((resolve, reject) => {
      req.logIn(user, (err: Error) => {
        if (err) reject(err);
        else resolve(user);
      });
    });
  }

  @Post('sign-out')
  @UseGuards(AuthenticatedGuard)
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    await new Promise((resolve, reject) => {
      req.logOut((err: Error) => {
        if (err) reject(err);
        else resolve(req.user);
      });
    });

    await new Promise((resolve, reject) => {
      req.session.destroy((err: Error) => {
        if (err) reject(err);
        else resolve(req.user);
      });
    });

    res.clearCookie('connect.sid');
  }
}
