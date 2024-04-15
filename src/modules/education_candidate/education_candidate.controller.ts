import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { EducationCandidateService } from './education_candidate.service';
import { CreateEducationCandidateDto } from './dto/create-education_candidate.dto';
import { UpdateEducationCandidateDto } from './dto/update-education_candidate.dto';

@Controller('api/v2/candidate')  
export class EducationCandidateController {
  constructor(private readonly educationCandidateService: EducationCandidateService) {}


  // thêm thông tin học vấn
  @Post("createEducation")
  create(@Body() body:CreateEducationCandidateDto ,@Res() res ) {
    try {
      const {candidate_id,name_education,major,started_at,end_at,info} = body 
      // console.log(body)
      const result = this.educationCandidateService.createNewEducation(candidate_id,name_education,major,started_at,end_at,info)
      res.status(201).json({message:"create success"})
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

  //update thông tin học vấn candidate
  @Patch("updateEducation")
  update(@Body() body:CreateEducationCandidateDto ,@Res() res ) {
    try {
      const {candidate_id,name_education,major,started_at,end_at,info} = body 
      // console.log(body)
      const result = this.educationCandidateService.updateNewEducation(candidate_id,name_education,major,started_at,end_at,info)
      res.status(200).json({message:"update education success"})
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

  @Delete('deleteEducation/:id')
  delete(@Param('id') id: string, @Res() res) {
    try {
      console.log(id)
      const result = this.educationCandidateService.removeEdication(id);
      res.status(200).json({message:"delete education success"})
    } catch (error) {
      res.status(400).json({message:error})
    }
  }
}
