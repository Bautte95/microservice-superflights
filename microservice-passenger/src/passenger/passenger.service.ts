import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PASSENGER } from 'src/common/models/models';
import { IPassenger } from 'src/common/interfaces/passenger.interface';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>,
  ) {}

  async create(createPassengerDto: CreatePassengerDto): Promise<IPassenger> {
    return await this.model.create(createPassengerDto);
  }

  async findAll(): Promise<Array<IPassenger>> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IPassenger | null> {
    return await this.model.findById(id);
  }

  async update(
    id: string,
    updatePassengerDto: UpdatePassengerDto,
  ): Promise<IPassenger | null> {
    return await this.model.findByIdAndUpdate(id, updatePassengerDto, {
      new: true,
    });
  }

  async remove(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      message: 'El registro fue eliminado exitosamente.',
    };
  }
}
