import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { SkillsCandidateService } from './skills_candidate.service';
import { CreateSkillsCandidateDto } from './dto/create-skills_candidate.dto';
import { UpdateSkillsCandidateDto } from './dto/update-skills_candidate.dto';
import { AuthGuard } from '../guard/auth.guard';

@Controller('api/v2/candidate')
export class SkillsCandidateController {
  constructor(private readonly skillsCandidateService: SkillsCandidateService) {}

  @Get("getAllSkills")
  @UseGuards(AuthGuard)
  async findSkills(@Res() res,@Req() req) {
    try {
      const result = await this.skillsCandidateService.findSkills(req.account.email);
      res.status(200).json({
        message:"success",
        data:result
      })
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

  // them ki nang candidate 
  @Post("createSkill")
  async create(@Body() createSkillsCandidateDto: CreateSkillsCandidateDto,@Res() res) {
    try {
      console.log(createSkillsCandidateDto)
      const result = await this.skillsCandidateService.createSkill(createSkillsCandidateDto);
      res.status(201).json({message:"create skill success"}) 
    } catch (error) {
      res.status(400).json({message:error})
    }
  }
  
  //update ki nang candidate
  @Patch('updateSkill/:id')
  update(@Param('id') id: string, @Body() updateSkillsCandidateDto: UpdateSkillsCandidateDto,@Res() res) {
    console.log(updateSkillsCandidateDto,id)
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
