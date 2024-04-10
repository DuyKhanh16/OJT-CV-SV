import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeveljobsService } from './leveljobs.service';
import { CreateLeveljobDto } from './dto/create-leveljob.dto';
import { UpdateLeveljobDto } from './dto/update-leveljob.dto';

@Controller('leveljobs')
export class LeveljobsController {
  constructor(private readonly leveljobsService: LeveljobsService) {}

  @Post()
  create(@Body() createLeveljobDto: CreateLeveljobDto) {
    return this.leveljobsService.create(createLeveljobDto);
  }

  @Get()
  findAll() {
    return this.leveljobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leveljobsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeveljobDto: UpdateLeveljobDto) {
    return this.leveljobsService.update(+id, updateLeveljobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leveljobsService.remove(+id);
  }
}
