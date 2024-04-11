import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { Repository } from 'typeorm';
import { async } from 'rxjs';

@Injectable()
export class CandidatesService {
 constructor(
    @InjectRepository(Candidate) private candidateRepository: Repository<Candidate>
 ) {}
   async createNewCandidate(name:string) {
      await this.candidateRepository.save({name:name});
   }
  
}
