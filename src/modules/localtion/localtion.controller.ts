import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocaltionService } from './localtion.service';
import { CreateLocaltionDto } from './dto/create-localtion.dto';
import { UpdateLocaltionDto } from './dto/update-localtion.dto';

@Controller('localtion')
export class LocaltionController {
  constructor(private readonly localtionService: LocaltionService) {}

  @Post()
  create(@Body() createLocaltionDto: CreateLocaltionDto) {
    return this.localtionService.create(createLocaltionDto);
  }

  @Get()
  findAll() {
    return this.localtionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localtionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocaltionDto: UpdateLocaltionDto) {
    return this.localtionService.update(+id, updateLocaltionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localtionService.remove(+id);
  }
}
