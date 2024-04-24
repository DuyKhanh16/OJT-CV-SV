import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuthGuard } from '../guard/auth.guard';

@Controller('api/v2/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Patch('update/:id')
  BanorUnbandAccount(@Param('id') id: string, @Body() updateAccountDto: any) {
    console.log(id,updateAccountDto,"đã ăn vào đây")
    return this.accountService.BanorUnbandAccount(+id, updateAccountDto);
  }

  @Get("id-auth")
  @UseGuards(AuthGuard)
  async getCandidateByAuth(@Res() res,@Req() req) {
    try {
      const result = await this.accountService.getcandidateByEmail(req.account.email);
      res.status(200).json({
        message:"success",
        data:result.id
      })
    } catch (error) {
      res.status(400).json({message:error})
    }
  }
}
