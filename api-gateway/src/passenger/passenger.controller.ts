import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PassengerDto } from './dto/passenger.dto';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { PassengerMsg } from 'src/common/constants';

@Controller('api/passenger')
export class PassengerController {
  private clientProxyPassenger: ClientProxy;
  constructor(private readonly clientProxy: ClientProxySuperFlights) {
    this.clientProxyPassenger = this.clientProxy.clientProxyPassenger();
  }

  @Post()
  create(@Body() passengerDto: PassengerDto): Observable<IPassenger> {
    return this.clientProxyPassenger.send(PassengerMsg.CREATE, passengerDto);
  }

  @Get()
  findAll(): Observable<Array<IPassenger>> {
    return this.clientProxyPassenger.send(PassengerMsg.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IPassenger> {
    return this.clientProxyPassenger.send(PassengerMsg.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() passengerDto: PassengerDto,
  ): Observable<IPassenger> {
    return this.clientProxyPassenger.send(PassengerMsg.UPDATE, {
      id,
      passengerDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<string> {
    return this.clientProxyPassenger.send(PassengerMsg.DELETE, id);
  }
}
