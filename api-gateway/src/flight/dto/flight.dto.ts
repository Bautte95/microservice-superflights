import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class FlightDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  pilot: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  airplane: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  destinationCity: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  flightDate: Date;
}
