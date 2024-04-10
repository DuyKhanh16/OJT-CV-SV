import { Injectable } from '@nestjs/common';
import { CreateLocaltionDto } from './dto/create-localtion.dto';
import { UpdateLocaltionDto } from './dto/update-localtion.dto';

@Injectable()
export class LocaltionService {
  create(createLocaltionDto: CreateLocaltionDto) {
    return 'This action adds a new localtion';
  }

  findAll() {
    return `This action returns all localtion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} localtion`;
  }

  update(id: number, updateLocaltionDto: UpdateLocaltionDto) {
    return `This action updates a #${id} localtion`;
  }

  remove(id: number) {
    return `This action removes a #${id} localtion`;
  }
}
