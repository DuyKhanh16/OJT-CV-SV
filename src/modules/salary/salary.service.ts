import {  Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Salary } from "./entities/salary.entity";
import { Repository } from "typeorm";

@Injectable()
export class SalaryService {
    constructor(
        @InjectRepository(Salary) private salaryRepository: Repository<Salary>,
    ) {}
    async getSalary() {
        const result = await this.salaryRepository.find();
        return result
    }
}