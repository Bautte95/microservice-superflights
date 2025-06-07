import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { Observable } from 'rxjs';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserMSG } from 'src/common/constants';
import { UserDto } from './dto/user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('api/user')
export class UserController {
  private clientProxyUser: ClientProxy;

  constructor(private readonly clientProxy: ClientProxySuperFlights) {
    this.clientProxyUser = this.clientProxy.clientProxyUser();
  }

  @Post()
  create(@Body() userDto: UserDto): Observable<IUser> {
    return this.clientProxyUser.send(UserMSG.CREATE, userDto);
  }

  @Get()
  findAll(): Observable<Array<IUser>> {
    return this.clientProxyUser.send(UserMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IUser> {
    return this.clientProxyUser.send(UserMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto): Observable<IUser> {
    return this.clientProxyUser.send(UserMSG.UPDATE, { id, userDto });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<string> {
    return this.clientProxyUser.send(UserMSG.DELETE, id);
  }
}
