import { PartialType } from '@nestjs/swagger';
import { CreateLocaltionDto } from './create-localtion.dto';

export class UpdateLocaltionDto extends PartialType(CreateLocaltionDto) {}
