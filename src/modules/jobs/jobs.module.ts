import { Module, forwardRef } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { TypejobModule } from '../typejob/typejob.module';
import { LeveljobsModule } from '../leveljobs/leveljobs.module';
import { LocaltionModule } from '../localtion/localtion.module';
import { TypesJobs } from './entities/types_jobs.entity';
import { LeversJobs } from './entities/levers_jobs.entity';
import { CompaniesModule } from '../companies/companies.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [JobsController],
  providers: [JobsService],
  imports: [TypeOrmModule.forFeature([Job]),TypeOrmModule.forFeature([TypesJobs]),TypeOrmModule.forFeature([LeversJobs])
  ,forwardRef(() => TypejobModule),forwardRef(() => LeveljobsModule),forwardRef(() => LocaltionModule),forwardRef(() => CompaniesModule),
  forwardRef(() => AuthModule)
],
  exports: [JobsService]
})
export class JobsModule {}
