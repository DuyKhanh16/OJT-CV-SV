import { Injectable } from '@nestjs/common';
import { CreateLeveljobDto } from './dto/create-leveljob.dto';
import { UpdateLeveljobDto } from './dto/update-leveljob.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Leveljob } from './entities/leveljob.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeveljobsService {
constructor(
  @InjectRepository(Leveljob) private leveljobRepository: Repository<Leveljob>,
) {}

 async getLeveljobById(id: string) {
   return await this.leveljobRepository.findOneBy({id:id});
 }
}
