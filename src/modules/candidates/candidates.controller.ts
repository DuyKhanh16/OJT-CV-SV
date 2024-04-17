import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto, UpdateInforCandidateDto } from './dto/update-candidate.dto';
import * as dotenv from 'dotenv';
import { AuthGuard } from '../guard/auth.guard';
dotenv.config();
@Controller('api/v2/candidates')
@UseGuards(AuthGuard)

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

  @Get("getAllInformation")
  async findAllInformation(@Res() res,@Req() req) {
    try {
      const result = await this.candidatesService.getAllInformation(req.account.email);
      res.status(200).json({ 
        message:"success",
        data:result
       });
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

  @Patch('updateAboutMe')
  async updateAboutMe(@Param('id') id: string, @Body() body:any,@Res() res,@Req() req) {
    console.log(req.account.email)
    console.log(body.aboutme)
    try {
      const result = await this.candidatesService.updateAboutMe(body.aboutMe,req.account.email);
      res.status(200).json({message:"update success"})
    }catch (error) {
      res.status(400).json({message:error})
    }
  }
  
  @Patch('updateInfoCandidate')
  async updateInfoCandidate(@Body() body:UpdateInforCandidateDto,@Res() res,@Req() req) {
    console.log(req.account.email)
    const {name,birthday,gender,phone,address,position,link_git} = body
    console.log(body)
    try {
      const result = await this.candidatesService.updateInfoCandidate(body,req.account.email)
      console.log(result)
      res.status(200).json({message:"update success"});
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

  

}
