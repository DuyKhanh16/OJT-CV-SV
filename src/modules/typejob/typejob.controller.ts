import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypejobService } from './typejob.service';
import { CreateTypejobDto } from './dto/create-typejob.dto';
import { UpdateTypejobDto } from './dto/update-typejob.dto';

@Controller('api/v2/typejob')
export class TypejobController {
  constructor(private readonly typejobService: TypejobService) {}

  // lấy tất cả typejob
  @Get("getall")
  findAll() {
    return this.typejobService.findAll();
  }
}
