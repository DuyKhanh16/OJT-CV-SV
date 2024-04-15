import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import * as dotenv from 'dotenv';
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

  @Get("getInfor/:id")
  async findOne(@Param('id') id: string,@Res() res) {
    console.log(id)
    try {
      const result = await this.candidatesService.getInfor(id);
      console.log(result)
      res.status(200).json({
        message:"success",
        data:result
      })
    } catch (error) {
      res.status(400).json({message:error})
    }
  }


  
}
