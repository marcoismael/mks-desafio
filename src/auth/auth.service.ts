import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.password == password) {
      const payload = { sub: user.id, username: user.email };
      console.log(payload)
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }else {
      throw new UnauthorizedException();
    }
  }
}
