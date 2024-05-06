import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req, Query } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto, UpdateInforCandidateDto } from './dto/update-candidate.dto';
import * as dotenv from 'dotenv';
import { AuthGuard } from '../guard/auth.guard';
import { EventsGateway } from 'src/socket/socket.gateway';
dotenv.config();
@Controller('api/v2/candidates')

export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService,
    private readonly socketioService: EventsGateway
  ) {}

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

  // phan trang

  @Get("getAllPaging")
  async findAllPaging(@Res() res,@Query() query) {
    // try {
    //   const result = await this.candidatesService.findAllPaging(query);
    //   res.status(200).json({ 
    //     message:"success",
    //     data:result
    //    });
    // } catch (error) {
    //   res.status(400).json({message:error})
    // }
  }

  @Get("getInfor")

  @UseGuards(AuthGuard)

  async findOne(@Param('id') id: string,@Res() res,@Req() req) {
    try {
      const result = await this.candidatesService.getInfor(req.account.email);
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
    try {
      const result = await this.candidatesService.updateAboutMe(body.aboutMe,req.account.email);
      res.status(200).json({message:"Cập nhật thành công"})
    }catch (error) {
      res.status(400).json({message:error})
    }
  }
  
  @Patch('updateInfoCandidate')
  @UseGuards(AuthGuard)
  async updateInfoCandidate(@Body() body:UpdateInforCandidateDto,@Res() res,@Req() req) {
    // console.log(req.account.email)
    const {name,birthday,gender,phone,address,position,link_git,avatar} = body
    console.log(body)
    try {
      const result = await this.candidatesService.updateInfoCandidate(body,req.account.email)
      res.status(200).json({message:"Cập nhật thành công"});
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
     try {
       const result = await this.candidatesService.searchCandidate(name,location,level,position);
       res
       .status(process.env.STATUS_CREATR_OK)
       .json({ message: process.env.SUCCESS, data: result });
     } catch (error) {
        res.status(process.env.STATUS_FAIL).json({ message: error.message });
     }
  }
  
  // tạo bản lưu candidate-job
  @Post("candidate-save-job")
  @UseGuards(AuthGuard)
  async candidateSaveJob(@Body() body, @Res() res,@Req() req, @Query("job_id") job_id) {
    try {
      await this.candidatesService.createSaveCandidateJob(req.account.email,job_id)
      res.status(process.env.STATUS_CREATR_OK).json({ message: process.env.SUCCESS })
    } catch (error) {
      res.status(process.env.STATUS_FAIL).json({ message: error.message })
    }
  }

  // lấy các job đã lưu của candidate
  @Get("getJobSave")
  @UseGuards(AuthGuard)
  async getJobSaveCandidate(@Res() res,@Req() req) {
    try {
      const result=await this.candidatesService.getJobSaveCandidate(req.account.email)
      res.status(process.env.STATUS_SUCCESS).json({ 
        message: process.env.SUCCESS,
         data: result })
    } catch (error) {
      console.log(error);
      res.status(process.env.STATUS_FAIL).json({ message: error.message })
    }
  }

  // check xem candidate đã lưu job hay chưa
  @Get("checkSaveJob")
  @UseGuards(AuthGuard)
  async checkSaveJob(@Res() res,@Req() req,@Query("job_id") job_id) {
    const result = await this.candidatesService.checkSaveJob(req.account.email,job_id)
    if (result) {
      res.status(process.env.STATUS_SUCCESS).json({
        message: process.env.SUCCESS,
        data: true
      })
    }
    res.status(process.env.STATUS_SUCCESS).json({
      message: process.env.SUCCESS,
      data: false
    })
  }
}
