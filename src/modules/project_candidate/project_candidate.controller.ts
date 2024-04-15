import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ProjectCandidateService } from './project_candidate.service';
import { CreateProjectCandidateDto } from './dto/create-project_candidate.dto';
import { UpdateProjectCandidateDto } from './dto/update-project_candidate.dto';
import { error } from 'console';

@Controller('api/v2/candidate')
export class ProjectCandidateController {
  constructor(private readonly projectCandidateService: ProjectCandidateService) {}


  //them thong tin project candidate
  @Post("createProject")
  async create(@Body() createProjectCandidateDto: CreateProjectCandidateDto,@Res() res) {
    try {
      const result = await this.projectCandidateService.createProjectCandidate(createProjectCandidateDto);
      res.status(201).json({message:"create success"})
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

 
  //update thong tin project candidate
  @Patch('updateProject/:id')
  async update(@Param('id') id: string, @Body() updateProjectCandidateDto: CreateProjectCandidateDto,@Res() res) {
    try {
      const result = await this.projectCandidateService.updateProjectCandidate(id,updateProjectCandidateDto)
      res.status(200).json({message:"update success"})
    } catch (error) {
      res.status(400).json({message:error})
    }
  }



  //xoa thong tin project candidate
  @Delete('deleteProject/:id')
  async remove(@Param('id') id: string,@Res() res) {
    try {
      const result = await this.projectCandidateService.deleteProject(id)
      res.status(200).json({message:"delete success"})
    } catch (error) {
      res.status(400).json({message:error})
    }
  }
}
