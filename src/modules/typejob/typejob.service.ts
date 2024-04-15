import { Injectable } from '@nestjs/common';
import { CreateTypejobDto } from './dto/create-typejob.dto';
import { UpdateTypejobDto } from './dto/update-typejob.dto';
import { Typejob } from './entities/typejob.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypejobService {
 constructor(
  @InjectRepository(Typejob) private typejobRepository: Repository<Typejob>,
 ) {}

  async getTypejobById(id:string) {
    return await this.typejobRepository.findOneBy({id:id});
  }
}
