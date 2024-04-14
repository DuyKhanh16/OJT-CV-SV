import { Injectable } from '@nestjs/common';
import { CreateLocaltionDto } from './dto/create-localtion.dto';
import { UpdateLocaltionDto } from './dto/update-localtion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Localtion } from './entities/localtion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocaltionService {

  constructor(
    @InjectRepository(Localtion) private localtionRepository: Repository<Localtion>,
  ) {}
    // lấy location theo Id
  async getLocation(id:string) {
    return await this.localtionRepository.findOneBy({id:id});
  }
}
