import { CreateFlightDto } from './create-flight.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateFlightDto extends PartialType(CreateFlightDto) {}
