import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async validateGoogleUser(profile: any) {
    const { emails, displayName, photos } = profile;

    let user = await this.prisma.user.findUnique({
      where: { email: emails[0].value },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: emails[0].value,
          name: displayName,
          picture: photos?.[0]?.value,
          provider: 'google',
        },
      });
    }

    // return user object only
    return user;
  }

  async generateJwt(user: any) {
    return this.jwt.sign({
      sub: user.id,
      email: user.email,
    });
  }
}
