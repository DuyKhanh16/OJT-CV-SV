import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateAddressCompanyDto, UpdateInfoCompanyDto } from './dto/create-company.dto';
require('dotenv').config();

@Controller('api/v2/companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

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
