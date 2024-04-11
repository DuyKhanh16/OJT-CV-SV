import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateCandidateAuthDto } from './dto/create-auth.dto';
import { MailService } from 'src/mail/mail.service';
require('dotenv').config();
@Controller('api/v2/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService
    ) {}

 @Post("login-candidate")
async createNewCandidate(@Body() createCandidateAuthDto: CreateCandidateAuthDto,@Res() res) {
    try {
      await this.authService.registerCandidate(createCandidateAuthDto);
      const formdata:any= {}
      formdata.toList =[createCandidateAuthDto.email],
      formdata.subject ="Wellcome",
      formdata.name =createCandidateAuthDto.name,
  
      await this.mailService.sendEmailRegister(formdata)
      res.status(200).json({message: process.env.REGISTER_OK});
    } catch (error) {
      console.log(error);
      res.status(400).json({message: error.message});
    }
  }
}
