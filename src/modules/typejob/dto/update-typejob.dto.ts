import { PartialType } from '@nestjs/swagger';
import { CreateTypejobDto } from './create-typejob.dto';

export class UpdateTypejobDto extends PartialType(CreateTypejobDto) {}
