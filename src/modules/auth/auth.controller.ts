import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('api/v2')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() createAuthDto: CreateAuthDto,@Res() res) {
    try {
      const result = await this.authService.login(createAuthDto);
      console.log(result)
      res.status(200).json({
        message: "login successfull",
        data: result
      })
    } catch (error) {
      res.status(500).json({
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
      res.status(200).json({
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
    res.status(200).json({
      message: "OTP has been sent to your email",
      OTP: checkMail
    })
  }
}
