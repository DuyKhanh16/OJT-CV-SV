import { Injectable } from '@nestjs/common';
import { CreateLeveljobDto } from './dto/create-leveljob.dto';
import { UpdateLeveljobDto } from './dto/update-leveljob.dto';

@Injectable()
export class LeveljobsService {
  create(createLeveljobDto: CreateLeveljobDto) {
    return 'This action adds a new leveljob';
  }

  findAll() {
    return `This action returns all leveljobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leveljob`;
  }

  update(id: number, updateLeveljobDto: UpdateLeveljobDto) {
    return `This action updates a #${id} leveljob`;
  }

  remove(id: number) {
    return `This action removes a #${id} leveljob`;
  }
}
