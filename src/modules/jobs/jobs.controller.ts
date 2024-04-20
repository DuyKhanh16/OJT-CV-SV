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
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto, applyJobDto } from './dto/create-job.dto';
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
  
// get all jobs của admin
@Get("getJobsforadmin")
async findAllAdminJobs(@Res() res) {
  const result = await this.jobsService.findAllAdminJobs();
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
    // console.log(id,"đã ăn vào đây")
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
    // console.log(updateJob,id,"đã vào đến đây")
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

@Get("getCandidatesbyIdJob/:id")
async getCandidatesbyIdJob(@Param("id") id:string, @Res() res) {
  console.log(id)
  try {
    const result = await this.jobsService.getCandidatesbyIdJob(id);
  res.status(200).json({ 
    message:"success",
    data:result
   });
  } catch (error) {
    res.status(400).json({message:error})
  }
  
}

@Get("getCandidatesApplying")
@UseGuards(AuthGuard)
async getAllCandidatesAppling(@Res() res, @Req() req) {
  try {
    const result = await this.jobsService.getCandidatesApplyingforCompany(req.account.email);
  res.status(200).json({ 
    message:"success",
    data:result
   });
  } catch (error) {
    res.status(400).json({message:error})
  }
}
  // lấy job theo Id(jobdetail)
  @Get("detail/:id")
  async getJobById(@Param("id") id, @Res() res) {
    try {
      const result = await this.jobsService.getJobById(id);
      res.status(process.env.STATUS_SUCCESS).json({ 
        message:process.env.SUCCESS,
        data:result
       });
    } catch (error) {
      console.log(error);
      res.status(process.env.STATUS_FAIL).json({ message: error.message });
    }
  }

  // Delete Job
  @Delete("delete/:id")
  async deleteJobById(@Param("id") id, @Res() res) {
    console.log(id,"đã ăn vào đây")
    try {
    const result =  await this.jobsService.deleteoneJob(id);
      res.status(process.env.STATUS_SUCCESS).json({ message: process.env.SUCCESS });
    } catch (error) {
      console.log(error);
      res.status(process.env.STATUS_FAIL).json({ message: error.message });
    }
  }
  
  //update status job
  @Patch("updatestatus/:id")
  async updateStatusJob(@Param("id") id, @Res() res,@Query("status") status) {
    console.log(id,status,"11111111111111111111111111111111111111111111111111111")
    try {
      await this.jobsService.updateStatusJob(id,status)
      res
      .status(process.env.STATUS_CREATR_OK)
      .json({ message: process.env.SUCCESS });
    } catch (error) {
      console.log(error);
      res.status(process.env.STATUS_FAIL).json({ message: error.message });
    }
    
  }
  @Post("applyJob")
  async applyJob(@Body() applyJobDto: applyJobDto, @Res() res) {
    try {
      console.log(applyJobDto)
      const result = await this.jobsService.applyJob(applyJobDto);
      console.log(result)
      res.status(200).json({ 
        message:"Applied success",
        data:result
      })
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

  @Get("getJobAppliedCandidates")
  @UseGuards(AuthGuard)
  async getJobAppliedCandidates(@Res() res, @Req() req) {
    try {
      const result = await this.jobsService.getJobAppliedCandidates(req.account.email);
    res.status(200).json({ 
      message:"success",
      data:result
     });
    } catch (error) {
      res.status(400).json({message:error})
    }
  }


  //  Từ chối ứng viên
  @Post("cancelCandidate/:id")
  @UseGuards(AuthGuard)
  async cancelCandidate(@Param("id") id, @Res() res) {
    
    try {
      await this.jobsService.cancelCandidate(id);
      res
      .status(process.env.STATUS_SUCCESS)
      .json({message: process.env.SUCCESS });
    } catch (error) {
      console.log(error);
      res.status(process.env.STATUS_FAIL).json({ message: error.message });
    }
  }
  @Get("searchJob")
  async searchJob(@Res() res) {
    try {
      const result = await this.jobsService.searchJob();
      res.status(200).json({ 
        message:"success",
        data:result
       });
    } catch (error) {
      res.status(400).json({message:error})

    }
  }

}
  