import { Controller, Get } from "@nestjs/common";
import { SalaryService } from "./salary.service";

@Controller('api/v2/salary')
export class SalaryController {
    constructor(
        private readonly salaryService: SalaryService
    ) {}

    @Get('getAll')
    getSalary() {
        return this.salaryService.getSalary();
    }
}