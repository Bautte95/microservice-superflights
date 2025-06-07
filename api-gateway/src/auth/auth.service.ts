import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { UserMSG } from 'src/common/constants';
import { firstValueFrom } from 'rxjs';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  private clientProxyUser: ClientProxy;
  constructor(
    private readonly clientProxy: ClientProxySuperFlights,
    private readonly jwtServices: JwtService,
  ) {
    this.clientProxyUser = this.clientProxy.clientProxyUser();
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await firstValueFrom(
      this.clientProxyUser.send(UserMSG.VALID_USER, {
        username,
        password,
      }),
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, username: user.username };

    return { access_token: await this.jwtServices.signAsync(payload) };
  }

  async signUp(userDto: UserDto) {
    return await firstValueFrom(
      this.clientProxyUser.send(UserMSG.CREATE, userDto),
    );
  }
}
