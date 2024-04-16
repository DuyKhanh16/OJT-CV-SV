import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectCandidateDto {
  candidate_id: string | any;

  name: string;

  link: string;

  info: string;

  start_at: string;

  end_at: string;
}
