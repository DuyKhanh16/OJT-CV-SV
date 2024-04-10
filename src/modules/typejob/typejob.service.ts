import { Injectable } from '@nestjs/common';
import { CreateTypejobDto } from './dto/create-typejob.dto';
import { UpdateTypejobDto } from './dto/update-typejob.dto';

@Injectable()
export class TypejobService {
  create(createTypejobDto: CreateTypejobDto) {
    return 'This action adds a new typejob';
  }

  findAll() {
    return `This action returns all typejob`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typejob`;
  }

  update(id: number, updateTypejobDto: UpdateTypejobDto) {
    return `This action updates a #${id} typejob`;
  }

  remove(id: number) {
    return `This action removes a #${id} typejob`;
  }
}
