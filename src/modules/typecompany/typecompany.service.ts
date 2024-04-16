import { Injectable } from '@nestjs/common';
import { CreateTypecompanyDto } from './dto/create-typecompany.dto';
import { UpdateTypecompanyDto } from './dto/update-typecompany.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Typecompany } from './entities/typecompany.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypecompanyService {
  constructor(
    @InjectRepository(Typecompany) private typecompanyRepository: Repository<Typecompany>,
   
  ){}

  async findAll(): Promise<Typecompany[]> {
    return await this.typecompanyRepository.find();
  }
}
