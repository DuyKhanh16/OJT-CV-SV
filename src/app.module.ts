import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from './modules/companies/companies.module';
import { CandidatesModule } from './modules/candidates/candidates.module';
import { JobsModule } from './modules/jobs/jobs.module';
import config from 'ormconfig';
import { AccountModule } from './modules/account/account.module';
import { LocaltionModule } from './modules/localtion/localtion.module';
import { LeveljobsModule } from './modules/leveljobs/leveljobs.module';
import { TypejobModule } from './modules/typejob/typejob.module';
import { ProjectCandidateModule } from './modules/project_candidate/project_candidate.module';
import { SkillsCandidateModule } from './modules/skills_candidate/skills_candidate.module';
import { EducationCandidateModule } from './modules/education_candidate/education_candidate.module';
import { ExperienceCandidateModule } from './modules/experience_candidate/experience_candidate.module';
import { CertificateCandidateModule } from './modules/certificate_candidate/certificate_candidate.module';
import { TypecompanyModule } from './modules/typecompany/typecompany.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from './mailer/mailer.module';
import { SalaryModule } from './modules/salary/salary.module';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [TypeOrmModule.forRoot(config),
    MailModule,
    SalaryModule,
    CompaniesModule,
    CandidatesModule,
    JobsModule,
    AccountModule,
    LocaltionModule,
    LeveljobsModule,
    TypejobModule,
    ProjectCandidateModule,
    SkillsCandidateModule, 
    EducationCandidateModule, 
    ExperienceCandidateModule, 
    CertificateCandidateModule, 
    TypecompanyModule, 
    AuthModule, 
    MailerModule,
    NotificationModule], 
  controllers: [],
  providers: [],
})
export class AppModule {}
