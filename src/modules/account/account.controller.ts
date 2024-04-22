import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('api/v2/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Patch('update/:id')
  BanorUnbandAccount(@Param('id') id: string, @Body() updateAccountDto: any) {
    console.log(id,updateAccountDto,"đã ăn vào đây")
    return this.accountService.BanorUnbandAccount(+id, updateAccountDto);
  }

  
}
