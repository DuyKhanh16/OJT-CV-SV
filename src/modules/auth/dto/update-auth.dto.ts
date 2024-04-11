import { PartialType } from '@nestjs/swagger';
import { CreateCandidateAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateCandidateAuthDto) {}
