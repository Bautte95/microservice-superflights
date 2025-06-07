import { Controller } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PassengerMsg } from 'src/common/constants';

@Controller()
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @MessagePattern(PassengerMsg.CREATE)
  create(@Payload() createPassengerDto: CreatePassengerDto) {
    return this.passengerService.create(createPassengerDto);
  }

  @MessagePattern(PassengerMsg.FIND_ALL)
  findAll() {
    return this.passengerService.findAll();
  }

  @MessagePattern(PassengerMsg.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.passengerService.findOne(id);
  }

  @MessagePattern(PassengerMsg.UPDATE)
  update(@Payload() payload) {
    return this.passengerService.update(payload.id, payload.passengerDto);
  }

  @MessagePattern(PassengerMsg.DELETE)
  remove(@Payload() id: string) {
    return this.passengerService.remove(id);
  }
}
