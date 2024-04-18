import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { zip } from 'rxjs/operators';
import { AuthGuard } from '../guard/auth.guard';
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
  //lay tat ca job moi dc dang tuyen 
  @Get("getNewJobs")
  async findAllNewJobs(@Res() res) {
    const now = new Date().toISOString().split("/").reverse().join("");
    const result = await this.jobsService.findAllLiveJobs();
    const arr = result.filter((item) => {
      return item.created_at.toString().slice(0, 10).split("-").join("") >= now;
    })
    res.status(200).json({ 
      message:"success",
      data:arr
     });
  }

  // Lấy Job theo Id company(a khanh )
  @Get("company/:id")
  async getJobByIdCompany(@Param("id") id, @Res() res) {
   try {
    const result = await this.jobsService.getJobByIdCompany(id);
    res.status(process.env.STATUS_SUCCESS).json({ 
      message:process.env.SUCCESS,
      data:result
     });
   } catch (error) {
    console.log(error);
    res.status(process.env.STATUS_FAIL).json({ message: error.message });
   }
  }

 

  //lay tat ca job dang tuyen dung cua cty (Hoang viet)
  @Get("getJobsForCompany")
  @UseGuards(AuthGuard)
  async getJobsForCompany(@Res() res, @Req() req) {
    try {
      const result = await this.jobsService.getJobsForCompany(req.account.email);
    res.status(200).json({ 
      message:"success",
      data:result
     });
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

 // Tạo mới job
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
  
//   Update Job
 @Patch("edit/:id")
  async editJob(
    @Body() updateJob: UpdateJobDto,
    @Res() res,
    @Param('id') id,
  ){
    try {
      await this.jobsService.updateJob(updateJob,id)
      res
      .status(process.env.STATUS_CREATR_OK)
      .json({ message: process.env.SUCCESS });
    } catch (error) {
      console.log(error);
      res.status(process.env.STATUS_FAIL).json({ message: error.message });
    }
  }


}
