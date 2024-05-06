import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as argon from 'argon2'; 
require('dotenv').config();
import {
  CreateCandidateAuthDto,
  CreateCompanyDto,
} from './dto/create-auth.dto';
import { register } from 'module';
import { MailService } from 'src/mailer/mailer.service';
@Controller('api/v2/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService
    ) {}
  
  @Get("checkMail")
  async checkMail(@Res() res,@Query('email') email:string) {
    try {
    const checkMail = await this.authService.checkMail(email)
    if(checkMail){
      const to = email
      const subject = "Update password"
      const name = await argon.hash(email)
      await this.mailService. sendMailForgotPassword(to,subject,name);
      res.status(process.env.STATUS_SUCCESS).json({
        message: process.env.SUCCESS,
        token:name,
        check:2
      })
    }else{
      res.status(process.env.STATUS_SUCCESS).json({
        message: process.env.SUCCESS,
        check:1
      })
    }
    
    } catch (error) {
      res.status(process.env.STATUS_FAIL).json({ message: error.message });
    }
  }

  @Post('register-candidate')
  async createNewCandidate(
    @Body() createCandidateAuthDto: CreateCandidateAuthDto,
    @Res() res,
  ) {
    try {
      await this.authService.registerCandidate(createCandidateAuthDto);
      const to=createCandidateAuthDto.email
      const subject="Wellcome"
      const name=createCandidateAuthDto.name
        await this.mailService.sendMail(to,subject,name);
      res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  @Post('register-company')
  async createNewCompany(@Body() createCompanyDto: CreateCompanyDto,@Res() res) {
    try {
      await this.authService.registerCompany(createCompanyDto);
      const to=createCompanyDto.email
      const subject="Wellcome"
      const name=createCompanyDto.name
        await this.mailService.sendMail(to,subject,name);
      res.status(process.env.STATUS_CREATR_OK).json({ message: "register successfull" });
    } catch (error) {
      res.status(process.env.STATUS_FAIL).json({ message: error.message });
      
    }
  }

  @Post("login")
  async login(@Body() createAuthDto: CreateAuthDto,@Res() res) {
    console.log(createAuthDto)
    try {
      const result = await this.authService.login(createAuthDto);
      res.status(201).json({
        message: "Đăng nhập thành công",
        data: result
      })
    } catch (error) {
      res.status(400).json({
        message: "Đăng nhập thất bại",
      }) 
    }
  }
  @Post("loginByGoogle")
  async loginByGoogle(@Body() createAuthDto: CreateAuthDto,@Res() res) {
    console.log(createAuthDto)
    try {
      const result = await this.authService.loginByGoogle(createAuthDto);
      console.log(result)
      res.status(201).json({
        message: "Đăng nhập thành công",
        data: result
      })
    } catch (error) {
      res.status(400).json({
        message: "Đăng nhập thất bại",
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

  @Patch("updatePassword")
  async updatePassword(@Body() body,@Res() res) {
    try{
      const {email,password,token} = body
      console.log(email,password,token)
      const checkToken = await argon.verify(token,email)
      const hash = await argon.hash(password)
      if(checkToken){
        const updateMail = await this.authService.updatePassword(email,hash)
        if(updateMail){
        res.status(process.env.STATUS_SUCCESS).json({ message:"Change password success"})
        }
      }else{
        res.status(process.env.STATUS_FAIL).json({ message: "Token is not valid" });
      }
      // const checkMail = await this.authService.updatePassword(email,password)
    }
    catch(error){
      res.status(process.env.STATUS_FAIL).json({ message: error.message });
    }
}
}
  
 

 

  

