import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { ExperienceCandidateService } from './experience_candidate.service';
import { CreateExperienceCandidateDto } from './dto/create-experience_candidate.dto';
import { UpdateExperienceCandidateDto } from './dto/update-experience_candidate.dto';
import { AuthGuard } from '../guard/auth.guard';

@Controller('api/v2/candidate')
export class ExperienceCandidateController {
  constructor(private readonly experienceCandidateService: ExperienceCandidateService) {}


  @Get("getAllExperience")
  @UseGuards(AuthGuard)
  async findExperiences(@Res() res,@Req() req) {
    try {
      const result = await this.experienceCandidateService.findExperiences(req.account.email);
      res.status(200).json({ 
        message:"success",
        data:result

       });
    } catch (error) {
      res.status(400).json({message:error})
    }
  }
  // thêm kinh nghiem cadidate
  @Post("createExperience")
  create(@Body() body:CreateExperienceCandidateDto,@Res() res) {
    
    try {
      const result = this.experienceCandidateService.createExperience(body);
      res.status(201).json({message:"Thêm thông tin thành công"})
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

  @Patch('updateExperience/:id')
  update(@Param('id') id: string, @Body() updateExperienceCandidateDto: UpdateExperienceCandidateDto,@Res() res) {
    try {
      const result = this.experienceCandidateService.updateExperience(id, updateExperienceCandidateDto);
      res.status(200).json({message:"Cập nhật thông tin thành công"})
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

  @Delete('deleteExperience/:id')
  remove(@Param('id') id: string,@Res() res) {
    try {
      const result = this.experienceCandidateService.removeExperience(id);
      res.status(200).json({message:"Xóa thông tin thành công"})
    } catch (error) {
      res.status(400).json({message:error})
    }
  }
}
