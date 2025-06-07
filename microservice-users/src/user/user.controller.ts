import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from 'src/common/constants';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMSG.CREATE)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern(UserMSG.FIND_ALL)
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern(UserMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.userService.findOne(id);
  }

  @MessagePattern(UserMSG.UPDATE)
  update(@Payload() payload) {
    return this.userService.update(payload.id, payload.userDto);
  }

  @MessagePattern(UserMSG.DELETE)
  remove(@Payload() id: string) {
    return this.userService.remove(id);
  }

  @MessagePattern(UserMSG.VALID_USER)
  async validateUser(@Payload() payload) {
    const user = await this.userService.findByUsername(payload.username);

    if (!user) return null;

    const isValidPassword = await this.userService.checkPassword(
      payload.password,
      user.password,
    );

    return isValidPassword ? user : null;
  }
}
