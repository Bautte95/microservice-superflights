import { Controller } from '@nestjs/common';
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightMsg } from 'src/common/constants';

@Controller()
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @MessagePattern(FlightMsg.CREATE)
  create(@Payload() flightDto: CreateFlightDto) {
    return this.flightService.create(flightDto);
  }

  @MessagePattern(FlightMsg.FIND_ALL)
  findAll() {
    return this.flightService.findAll();
  }

  @MessagePattern(FlightMsg.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.flightService.findOne(id);
  }

  @MessagePattern(FlightMsg.UPDATE)
  update(@Payload() payload) {
    return this.flightService.update(payload.id, payload.flightDto);
  }

  @MessagePattern(FlightMsg.DELETE)
  remove(@Payload() id: string) {
    return this.flightService.remove(id);
  }

  @MessagePattern(FlightMsg.ADD_PASSENGER)
  addPassenger(@Payload() payload) {
    return this.flightService.addPassenger(
      payload.flightId,
      payload.passengerId,
    );
  }
}
