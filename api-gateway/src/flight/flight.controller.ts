import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FlightDto } from './dto/flight.dto';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FlightMsg, PassengerMsg } from 'src/common/constants';
import { AddPassengerDto } from './dto/add-passanger.dto';

@Controller('api/flight')
export class FlightController {
  private clientProxyFligth: ClientProxy;
  private clientProxyPassenger: ClientProxy;
  constructor(private readonly clientProxy: ClientProxySuperFlights) {
    this.clientProxyFligth = this.clientProxy.clientProxyFlight();
    this.clientProxyPassenger = this.clientProxy.clientProxyPassenger();
  }

  @Post()
  create(@Body() flightDto: FlightDto): Observable<IFlight> {
    return this.clientProxyFligth.send(FlightMsg.CREATE, flightDto);
  }

  @Get()
  findAll(): Observable<Array<IFlight>> {
    return this.clientProxyFligth.send(FlightMsg.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IFlight> {
    return this.clientProxyFligth.send(FlightMsg.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() flightDto: FlightDto,
  ): Observable<IFlight> {
    return this.clientProxyFligth.send(FlightMsg.UPDATE, { id, flightDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<string> {
    return this.clientProxyFligth.send(FlightMsg.DELETE, id);
  }

  @Post(':id')
  async addPassenger(
    @Param('id') id: string,
    @Body() addPassengerDto: AddPassengerDto,
  ) {
    const passenger = await firstValueFrom(
      this.clientProxyPassenger.send(
        PassengerMsg.FIND_ONE,
        addPassengerDto.passengerId,
      ),
    );

    if (!passenger) {
      throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND);
    }

    return this.clientProxyFligth.send(FlightMsg.ADD_PASSENGER, {
      flightId: id,
      passengerId: addPassengerDto.passengerId,
    });
  }
}
