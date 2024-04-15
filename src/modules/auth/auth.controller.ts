import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { MailService } from 'src/mail/mail.service';
require('dotenv').config();

import {
  CreateCandidateAuthDto,
  CreateCompanyDto,
} from './dto/create-auth.dto';
import { register } from 'module';
@Controller('api/v2/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService
    ) {}


  @Post('register-candidate')
  async createNewCandidate(
    @Body() createCandidateAuthDto: CreateCandidateAuthDto,
    @Res() res,
  ) {
    console.log(createCandidateAuthDto)
    try {
      await this.authService.registerCandidate(createCandidateAuthDto);
      // const formdata: any = {};
      // (formdata.toList = [createCandidateAuthDto.email]),
      //   (formdata.subject = 'Wellcome'),
      //   (formdata.name = createCandidateAuthDto.name),
      //   await this.mailService.sendEmailRegister(formdata);
      res.status(201).json({ message: 'register successfull' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }

  @Post('register-company')
  async createNewCompany(@Body() createCompanyDto: CreateCompanyDto,@Res() res) {
    console.log(createCompanyDto)
    try {
      await this.authService.registerCompany(createCompanyDto);
      // const formdata: any = {};
      // (formdata.toList = [createCompanyDto.email]),
      //   (formdata.subject = 'Wellcome'),
      //   (formdata.name = createCompanyDto.name),
      //   await this.mailService.sendEmailRegister(formdata);
      res.status(process.env.STATUS_CREATR_OK).json({ message: "register successfull" });
    } catch (error) {
      console.log(error);
      res.status(process.env.STATUS_FAIL).json({ message: error.message });
      
    }
  }

  @Post("login")
  async login(@Body() createAuthDto: CreateAuthDto,@Res() res) {
    console.log(createAuthDto)
    try {
      const result = await this.authService.login(createAuthDto);
      console.log(result)
      res.status(201).json({
        message: "login successfull",
        data: result
      })
    } catch (error) {
      res.status(400).json({
        message: "login fail",
      }) 
    }
  }

  @Post("forgetPassword")
  async getNewPassword(@Body() body,@Res() res) {
      const {email} = body
      console.log(email)
      const checkMail = await this.authService.getNewPassword(email)
      console.log(checkMail)
      res.status(process.env.STATUS_SUCCESS).json({
        message: "New Password has been sent to your email",
        newPassword: checkMail
      })
  }

  @Post("getOTP")
  async getOTP(@Body() body,@Res() res) {
    const {email} = body
    console.log(email)
    const checkMail = await this.authService.getOTP(email)
    console.log(checkMail)
    res.status(process.env.STATUS_SUCCESS).json({
      message: "OTP has been sent to your email",
      OTP: checkMail
    })
  }
  }

  
 

 

  

