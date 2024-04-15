import { PartialType } from '@nestjs/swagger';
import { CreateCandidateDto } from './create-candidate.dto';

export class UpdateCandidateDto extends PartialType(CreateCandidateDto) {

}
export class UpdateInforCandidateDto {
    name:string
    birthday:string
    gender:string|any
    phone:string
    address:string
    position:string
    link_git:string
}