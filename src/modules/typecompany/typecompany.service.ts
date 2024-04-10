import { Injectable } from '@nestjs/common';
import { CreateTypecompanyDto } from './dto/create-typecompany.dto';
import { UpdateTypecompanyDto } from './dto/update-typecompany.dto';

@Injectable()
export class TypecompanyService {
  create(createTypecompanyDto: CreateTypecompanyDto) {
    return 'This action adds a new typecompany';
  }

  findAll() {
    return `This action returns all typecompany`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typecompany`;
  }

  update(id: number, updateTypecompanyDto: UpdateTypecompanyDto) {
    return `This action updates a #${id} typecompany`;
  }

  remove(id: number) {
    return `This action removes a #${id} typecompany`;
  }
}
