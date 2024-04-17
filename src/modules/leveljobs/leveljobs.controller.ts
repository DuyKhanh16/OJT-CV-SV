import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeveljobsService } from './leveljobs.service';
import { CreateLeveljobDto } from './dto/create-leveljob.dto';
import { UpdateLeveljobDto } from './dto/update-leveljob.dto';

@Controller('api/v2/leveljob')
export class LeveljobsController {
  constructor(private readonly leveljobsService: LeveljobsService) {}
// lay tat ca leveljob

  @Get("getall")
  findAll() {
    return this.leveljobsService.findAll();
  }
  
}
