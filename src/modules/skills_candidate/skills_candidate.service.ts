import { Injectable } from '@nestjs/common';
import { CreateSkillsCandidateDto } from './dto/create-skills_candidate.dto';
import { UpdateSkillsCandidateDto } from './dto/update-skills_candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillsCandidate } from './entities/skills_candidate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillsCandidateService {
  constructor(  
    @InjectRepository(SkillsCandidate) private skillsCandidateRepository: Repository<SkillsCandidate>,
  ){}
  async createSkill(createSkillsCandidateDto: CreateSkillsCandidateDto) {
    const result = await this.skillsCandidateRepository.createQueryBuilder()
    .insert()
    .into(SkillsCandidate)
    .values({
      candidate_id: createSkillsCandidateDto.candidate_id,
      name: createSkillsCandidateDto.name,
      leveljob_id: createSkillsCandidateDto.leveljob_id
    })
    .execute();

    return result
  }


  updateSkill(id:string, updateSkillsCandidateDto: UpdateSkillsCandidateDto) {
    const result = this.skillsCandidateRepository.createQueryBuilder()
    .update(SkillsCandidate)
    .set({
      candidate_id: updateSkillsCandidateDto.candidate_id,
      name: updateSkillsCandidateDto.name,
      leveljob_id: updateSkillsCandidateDto.leveljob_id
    })
    .where("id = :id", { id: id })
    .execute();
    return result
  }

  removeSkill(id:string) {
    const result = this.skillsCandidateRepository.createQueryBuilder()
    .delete()
    .from(SkillsCandidate)
    .where("id = :id", { id: id })
    .execute();
    return result
  }
}
