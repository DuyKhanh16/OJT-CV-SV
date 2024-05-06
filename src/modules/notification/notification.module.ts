import { Module, forwardRef } from "@nestjs/common";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notification } from "./entity/notification.entity";
import { CandidatesModule } from "../candidates/candidates.module";

@Module({
    controllers: [NotificationController],
    providers: [NotificationService],
    exports: [NotificationService],
    imports: [TypeOrmModule.forFeature([Notification]),
    forwardRef(() => CandidatesModule),
    forwardRef(() => CandidatesModule),]
})
export class NotificationModule {}