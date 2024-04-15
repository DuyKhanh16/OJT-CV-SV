import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { SkillsCandidateService } from './skills_candidate.service';
import { CreateSkillsCandidateDto } from './dto/create-skills_candidate.dto';
import { UpdateSkillsCandidateDto } from './dto/update-skills_candidate.dto';

@Controller('api/v2/candidate')
export class SkillsCandidateController {
  constructor(private readonly skillsCandidateService: SkillsCandidateService) {}


  // them ki nang candidate 
  @Post("createSkill")
  async create(@Body() createSkillsCandidateDto: CreateSkillsCandidateDto,@Res() res) {
    try {
      console.log(createSkillsCandidateDto)
      const result = await this.skillsCandidateService.createSkill(createSkillsCandidateDto);
      res.status(201).json({message:"create success"}) 
    } catch (error) {
      res.status(400).json({message:error})
    }
  }
  
  //update ki nang candidate
  @Patch('updateSkill/:id')
  update(@Param('id') id: string, @Body() updateSkillsCandidateDto: UpdateSkillsCandidateDto,@Res() res) {
    try {
        const result = this.skillsCandidateService.updateSkill(id, updateSkillsCandidateDto);
        res.status(201).json({message:"update success"})
    } catch (error) {
      res.status(400).json({message:error})
    }
  }


  //xoa ki nang
  @Delete('deleteSkill/:id')
  remove(@Param('id') id: string,@Res() res) {
    try {
      const result = this.skillsCandidateService.removeSkill(id);
      res.status(200).json({message:"delete success"})
    } catch (error) {
      res.status(400).json({message:error})
    }
  }
}
