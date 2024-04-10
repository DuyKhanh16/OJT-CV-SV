import { PartialType } from '@nestjs/swagger';
import { CreateTypecompanyDto } from './create-typecompany.dto';

export class UpdateTypecompanyDto extends PartialType(CreateTypecompanyDto) {}
