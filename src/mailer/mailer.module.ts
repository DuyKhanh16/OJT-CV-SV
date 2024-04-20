import { Module } from "@nestjs/common";
import { MailService } from "./mailer.service";
import { MailController } from "./mailer.controller";

@Module({
    controllers: [MailController],
    providers: [MailService],
    imports: [],
    exports: [MailService],
})
export class MailerModule {}