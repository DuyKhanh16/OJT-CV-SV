import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
require('dotenv').config();
@Controller('api/v2/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}
  
  //lay tat ca job dang tuyen dung
  @Get("getLiveJobs")
  async findAll(@Res() res) {
    const result = await this.jobsService.findAllLiveJobs();
    res.status(200).json({ 
      message:"success",
      data:result
     });
  }


  @Post("create/:id")
 async createNewJob(@Body() createJobDto: CreateJobDto,@Res() res, @Param("id") id) {
   try {
    await this.jobsService.createNewJob(createJobDto,id);
    res.status(process.env.STATUS_CREATR_OK).json({ message: process.env.SUCCESS });
   } catch (error) {
    console.log(error);
    res.status(process.env.STATUS_FAIL).json({ message: error.message });
   }
   
 }
}
