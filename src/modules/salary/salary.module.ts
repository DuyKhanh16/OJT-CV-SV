import { Module } from "@nestjs/common";
import { SalaryController } from "./salary.controller";
import { SalaryService } from "./salary.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Salary } from "./entities/salary.entity";

@Module({
    controllers: [SalaryController],
    providers: [SalaryService],
    imports: [TypeOrmModule.forFeature([Salary])],
    exports: [SalaryService],
})
export class SalaryModule {}