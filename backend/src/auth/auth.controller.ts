import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req, @Res() res) {
    const { user } = req;

    const token = await this.authService.generateJwt(user);

    const redirectUrl = `${process.env.FRONTEND_URL}/auth-success?token=${token}`;

    return res.redirect(redirectUrl);
  }
}
