import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notification } from "./entity/notification.entity";
import { CompaniesService } from "../companies/companies.service";
import { CandidatesService } from "../candidates/candidates.service";

@Injectable()
export class NotificationService {
    constructor(
      
        @InjectRepository(Notification) private notificationRepository: Repository<Notification>
    ) { }

    async createNotification(content: string, candidate: any, company: any) {
        // const company = await this.companyService.getCompanyById(company_id)
        // const candidate = await this.candidateService.getCandidateById(candidate_id)
        await this.notificationRepository.save({
            title: content,
            candidate: candidate,
            company: company
        })
    }

}