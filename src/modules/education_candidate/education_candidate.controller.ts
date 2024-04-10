import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EducationCandidateService } from './education_candidate.service';
import { CreateEducationCandidateDto } from './dto/create-education_candidate.dto';
import { UpdateEducationCandidateDto } from './dto/update-education_candidate.dto';

@Controller('education-candidate')
export class EducationCandidateController {
  constructor(private readonly educationCandidateService: EducationCandidateService) {}

  @Post()
  create(@Body() createEducationCandidateDto: CreateEducationCandidateDto) {
    return this.educationCandidateService.create(createEducationCandidateDto);
  }

  @Get()
  findAll() {
    return this.educationCandidateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationCandidateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEducationCandidateDto: UpdateEducationCandidateDto) {
    return this.educationCandidateService.update(+id, updateEducationCandidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationCandidateService.remove(+id);
  }
}
