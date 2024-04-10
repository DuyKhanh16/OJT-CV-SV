import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypejobService } from './typejob.service';
import { CreateTypejobDto } from './dto/create-typejob.dto';
import { UpdateTypejobDto } from './dto/update-typejob.dto';

@Controller('typejob')
export class TypejobController {
  constructor(private readonly typejobService: TypejobService) {}

  @Post()
  create(@Body() createTypejobDto: CreateTypejobDto) {
    return this.typejobService.create(createTypejobDto);
  }

  @Get()
  findAll() {
    return this.typejobService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typejobService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypejobDto: UpdateTypejobDto) {
    return this.typejobService.update(+id, updateTypejobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typejobService.remove(+id);
  }
}
