import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypecompanyService } from './typecompany.service';
import { CreateTypecompanyDto } from './dto/create-typecompany.dto';
import { UpdateTypecompanyDto } from './dto/update-typecompany.dto';

@Controller('typecompany')
export class TypecompanyController {
  constructor(private readonly typecompanyService: TypecompanyService) {}

  @Post()
  create(@Body() createTypecompanyDto: CreateTypecompanyDto) {
    return this.typecompanyService.create(createTypecompanyDto);
  }

  @Get()
  findAll() {
    return this.typecompanyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typecompanyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypecompanyDto: UpdateTypecompanyDto) {
    return this.typecompanyService.update(+id, updateTypecompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typecompanyService.remove(+id);
  }
}
