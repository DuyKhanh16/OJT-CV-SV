import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CertificateCandidateService } from './certificate_candidate.service';
import { CreateCertificateCandidateDto } from './dto/create-certificate_candidate.dto';
import { UpdateCertificateCandidateDto } from './dto/update-certificate_candidate.dto';

@Controller('certificate-candidate')
export class CertificateCandidateController {
  constructor(private readonly certificateCandidateService: CertificateCandidateService) {}

  @Post()
  create(@Body() createCertificateCandidateDto: CreateCertificateCandidateDto) {
    return this.certificateCandidateService.create(createCertificateCandidateDto);
  }

  @Get()
  findAll() {
    return this.certificateCandidateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificateCandidateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCertificateCandidateDto: UpdateCertificateCandidateDto) {
    return this.certificateCandidateService.update(+id, updateCertificateCandidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificateCandidateService.remove(+id);
  }
}
