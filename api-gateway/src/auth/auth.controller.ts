import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signInDto';
import { Public } from 'src/common/decorators/public.decorators';
import { UserDto } from 'src/user/dto/user.dto';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  async signin(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
  }

  @Public()
  @Post('signup')
  singup(@Body() createUserDto: UserDto) {
    return this.authService.signUp(createUserDto);
  }
}
