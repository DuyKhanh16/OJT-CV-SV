import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
require('dotenv').config();
@Controller('api/v2/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('create/:id')
  async createNewJob(
    @Body() createJobDto: CreateJobDto,
    @Res() res,
    @Param('id') id,
  ) {
    try {
      await this.jobsService.createNewJob(createJobDto, id);
      res
        .status(process.env.STATUS_CREATR_OK)
        .json({ message: process.env.SUCCESS });
    } catch (error) {
      console.log(error);
      res.status(process.env.STATUS_FAIL).json({ message: error.message });
    }
  }

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
