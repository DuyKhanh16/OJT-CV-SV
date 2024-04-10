import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillsCandidateService } from './skills_candidate.service';
import { CreateSkillsCandidateDto } from './dto/create-skills_candidate.dto';
import { UpdateSkillsCandidateDto } from './dto/update-skills_candidate.dto';

@Controller('skills-candidate')
export class SkillsCandidateController {
  constructor(private readonly skillsCandidateService: SkillsCandidateService) {}

  @Post()
  create(@Body() createSkillsCandidateDto: CreateSkillsCandidateDto) {
    return this.skillsCandidateService.create(createSkillsCandidateDto);
  }

  @Get()
  findAll() {
    return this.skillsCandidateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillsCandidateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkillsCandidateDto: UpdateSkillsCandidateDto) {
    return this.skillsCandidateService.update(+id, updateSkillsCandidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillsCandidateService.remove(+id);
  }
}
