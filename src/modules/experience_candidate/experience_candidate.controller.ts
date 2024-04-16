import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ExperienceCandidateService } from './experience_candidate.service';
import { CreateExperienceCandidateDto } from './dto/create-experience_candidate.dto';
import { UpdateExperienceCandidateDto } from './dto/update-experience_candidate.dto';

@Controller('api/v2/candidate')
export class ExperienceCandidateController {
  constructor(private readonly experienceCandidateService: ExperienceCandidateService) {}


  // thêm kinh nghiem cadidate
  @Post("createExperience")
  create(@Body() body:CreateExperienceCandidateDto,@Res() res) {
    
    try {
      const result = this.experienceCandidateService.createExperience(body);
      res.status(201).json({message:"create success"})
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

  @Patch('updateExperience/:id')
  update(@Param('id') id: string, @Body() updateExperienceCandidateDto: UpdateExperienceCandidateDto,@Res() res) {
    try {
      const result = this.experienceCandidateService.updateExperience(id, updateExperienceCandidateDto);
      res.status(200).json({message:"update success"})
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

  @Delete('deleteExperience/:id')
  remove(@Param('id') id: string,@Res() res) {
    try {
      const result = this.experienceCandidateService.removeExperience(id);
      res.status(200).json({message:"delete success"})
    } catch (error) {
      res.status(400).json({message:error})
    }
  }
}
