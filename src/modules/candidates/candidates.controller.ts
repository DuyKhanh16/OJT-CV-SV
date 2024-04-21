import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req, Query } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto, UpdateInforCandidateDto } from './dto/update-candidate.dto';
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

@Get("getAllInformation")
@UseGuards(AuthGuard)

  async findAllInformation(@Res() res,@Req() req) {
    console.log(req.account.email)
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
@UseGuards(AuthGuard)

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
@UseGuards(AuthGuard)

  async updateInfoCandidate(@Body() body:UpdateInforCandidateDto,@Res() res,@Req() req) {
    console.log(req.account.email)
    const {name,birthday,gender,phone,address,position,link_git,avatar} = body
    console.log(body)
    try {
      const result = await this.candidatesService.updateInfoCandidate(body,req.account.email)
      console.log(result)
      res.status(200).json({message:"update success"});
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

  @Get("getInforCandidatebyId/:id")
  async getInforCandidatebyId(@Param("id") id, @Res() res) {
     try {
       const result = await this.candidatesService.getInforCandidatebyId(id);
       res
       .status(process.env.STATUS_CREATR_OK)
       .json({ message: process.env.SUCCESS, data: result });
     } catch (error) {
        res.status(process.env.STATUS_FAIL).json({ message: error.message });
     }
  }

  @Get("searchCandidate")
  async searchCandidate(@Query("name") name:string,@Query("location") location:string,@Query("level") level:string,@Query("position") position:string,  @Res() res) {
    console.log(name,location,level,position)
     try {
       const result = await this.candidatesService.searchCandidate(name,location,level,position);
       res
       .status(process.env.STATUS_CREATR_OK)
       .json({ message: process.env.SUCCESS, data: result });
     } catch (error) {
        res.status(process.env.STATUS_FAIL).json({ message: error.message });
     }
  }
}
