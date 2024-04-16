import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateAddressCompanyDto, UpdateInfoCompanyDto } from './dto/create-company.dto';
import { AuthGuard } from '../guard/auth.guard';
require('dotenv').config();

@Controller('api/v2/companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}


  @Get("getInfor")
  @UseGuards(AuthGuard)
  async findOne(@Res() res,@Req() req) {
    console.log(req.account.email)
    try {
      const result = await this.companiesService.getInfor(req.account.email);
      res.status(200).json({
        message:"success",
        data:result
      })
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

  @Get("getAll")
  async findAll(@Res() res) {
    const result = await this.companiesService.findAll();
    res.status(200).json({ 
      message:"success",
      data:result
     });
  }

  // Update thông tin company
  @Patch("update-info/:id")
 async updateInfoCompany(@Body() createCompanyDto: UpdateInfoCompanyDto,@Param("id") id,@Res() res) {
    try {
      await this.companiesService.updateInfoCompany(id,createCompanyDto);
      res.status(process.env.STATUS_CREATR_OK).json({ message: process.env.SUCCESS });
    } catch (error) {
      console.log(error);
      res.status(process.env.STATUS_FAIL).json({ message: error.message });
      
    }
  }
  
  // Tạo chi nhánh cho company
  @Post("create-address-company")
  async createAddressCompany(@Body() createAddressCompanyDto:CreateAddressCompanyDto, @Res() res) {
    try {
      await this.companiesService.createNewAddressCompany(createAddressCompanyDto);
      res.status(process.env.STATUS_CREATR_OK).json({ message: process.env.SUCCESS });
    } catch (error) {
      console.log(error);
      res.status(process.env.STATUS_FAIL).json({ message: error.message });
    }
  }

}
