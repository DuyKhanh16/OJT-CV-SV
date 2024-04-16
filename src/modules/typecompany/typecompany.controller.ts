import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { TypecompanyService } from './typecompany.service';
import { CreateTypecompanyDto } from './dto/create-typecompany.dto';
import { UpdateTypecompanyDto } from './dto/update-typecompany.dto';
require('dotenv').config();

@Controller('api/v2/typecompany')
export class TypecompanyController {
  constructor(private readonly typecompanyService: TypecompanyService) {}

  @Get("all")
  async getAllTypeCompany(@Res() res) {
    try {
      const listTypeCompany = await this.typecompanyService.findAll();
      res.status(process.env.STATUS_SUCCESS).json({ data: listTypeCompany });
    } catch (error) {
      console.log(error);
      res.status(process.env.STATUS_FAIL);
    }
  }

  @Post("create")
  async createTypeCompany(@Body() createTypecompanyDto: CreateTypecompanyDto, @Res() res) {
    try {
      await this.typecompanyService.createType(createTypecompanyDto);
      res.status(process.env.STATUS_CREATR_OK).json({ message: process.env.SUCCESS });
    } catch (error) {
      console.log(error);
      res.status(process.env.STATUS_FAIL).json({ message: error.message });      
    }
  }
}
