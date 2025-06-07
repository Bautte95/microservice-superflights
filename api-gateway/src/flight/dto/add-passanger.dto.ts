import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddPassengerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  passengerId: string;
}
