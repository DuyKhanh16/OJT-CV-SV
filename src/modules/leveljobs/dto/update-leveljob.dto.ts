import { PartialType } from '@nestjs/swagger';
import { CreateLeveljobDto } from './create-leveljob.dto';

export class UpdateLeveljobDto extends PartialType(CreateLeveljobDto) {}
