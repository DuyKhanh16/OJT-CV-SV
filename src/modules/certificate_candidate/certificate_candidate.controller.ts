import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { CertificateCandidateService } from './certificate_candidate.service';
import { CreateCertificateCandidateDto } from './dto/create-certificate_candidate.dto';
import { UpdateCertificateCandidateDto } from './dto/update-certificate_candidate.dto';
import { RolesGuard } from '../guard/role.guard';
import { Roles } from 'src/decorator/role.decorator';


@Controller('api/v2/candidate')
export class CertificateCandidateController {
  constructor(private readonly certificateCandidateService: CertificateCandidateService) {}


  // thêm tin chi cadidate
  @Post("createCertificate")
  create(@Body() body:CreateCertificateCandidateDto,@Res() res) {
    const {candidate_id,name,organization,start_at,end_at,info} = body
    console.log(body)
    try {
      const result = this.certificateCandidateService.createCertificate(body);
      res.status(201).json({message:"create success"})
    } catch (error) {
      res.status(400).json({message:error})
    }
  }


  @Patch('updateCertificate/:id')
  update(@Param('id') id: string, @Body() updateCertificateCandidateDto: UpdateCertificateCandidateDto,@Res() res) {
    try {
      const result = this.certificateCandidateService.updateCertificate(id, updateCertificateCandidateDto);
      res.status(200).json({message:"update success"})
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

  @Delete('deleteCertificate/:id')
  // @UseGuards(RolesGuard)
  remove(@Param('id') id: string,@Res() res) {
    console.log(id)
    try {
      const result = this.certificateCandidateService.removeEdication(id);
      res.status(200).json({message:"delete success"})
    } catch (error) {
      res.status(400).json({message:error})
    }
    // return this.certificateCandidateService.remove(+id);
  }
}
