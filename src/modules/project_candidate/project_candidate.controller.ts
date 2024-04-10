import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectCandidateService } from './project_candidate.service';
import { CreateProjectCandidateDto } from './dto/create-project_candidate.dto';
import { UpdateProjectCandidateDto } from './dto/update-project_candidate.dto';

@Controller('project-candidate')
export class ProjectCandidateController {
  constructor(private readonly projectCandidateService: ProjectCandidateService) {}

  @Post()
  create(@Body() createProjectCandidateDto: CreateProjectCandidateDto) {
    return this.projectCandidateService.create(createProjectCandidateDto);
  }

  @Get()
  findAll() {
    return this.projectCandidateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectCandidateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectCandidateDto: UpdateProjectCandidateDto) {
    return this.projectCandidateService.update(+id, updateProjectCandidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectCandidateService.remove(+id);
  }
}
