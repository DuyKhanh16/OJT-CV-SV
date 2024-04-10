import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExperienceCandidateService } from './experience_candidate.service';
import { CreateExperienceCandidateDto } from './dto/create-experience_candidate.dto';
import { UpdateExperienceCandidateDto } from './dto/update-experience_candidate.dto';

@Controller('experience-candidate')
export class ExperienceCandidateController {
  constructor(private readonly experienceCandidateService: ExperienceCandidateService) {}

  @Post()
  create(@Body() createExperienceCandidateDto: CreateExperienceCandidateDto) {
    return this.experienceCandidateService.create(createExperienceCandidateDto);
  }

  @Get()
  findAll() {
    return this.experienceCandidateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experienceCandidateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExperienceCandidateDto: UpdateExperienceCandidateDto) {
    return this.experienceCandidateService.update(+id, updateExperienceCandidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experienceCandidateService.remove(+id);
  }
}
