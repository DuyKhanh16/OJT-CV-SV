import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import * as dotenv from 'dotenv';
import { AuthGuard } from '../guard/auth.guard';
dotenv.config();
@Controller('api/v2/candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Get("getAll")
  async findAll(@Res() res) {
    try {
      const result = await this.candidatesService.findAll();
      res.status(200).json({ 
        message:"success",
        data:result
       });
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

  @Get("getInfor")
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string,@Res() res,@Req() req) {
    console.log(req.account.email)
    try {
      const result = await this.candidatesService.getInfor(req.account.email);
      console.log(result)
      res.status(200).json({
        message:"success",
        data:result
      })
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

  @Patch('updateAboutMe')
  @UseGuards(AuthGuard)
  async updateAboutMe(@Param('id') id: string, @Body() body:any,@Res() res,@Req() req) {
    console.log(req.account.email)
    console.log(body.aboutme)
    try {
      const result = await this.candidatesService.updateAboutMe(body.aboutMe,req.account.email);
      res.status(200).json({message:"update success"})
    } catch (error) {
      res.status(400).json({message:error})
    }
  }
  
}
