import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocaltionService } from './localtion.service';
import { CreateLocaltionDto } from './dto/create-localtion.dto';
import { UpdateLocaltionDto } from './dto/update-localtion.dto';

@Controller('localtion')
export class LocaltionController {
  constructor(private readonly localtionService: LocaltionService) {}

 
}
