import { Controller } from "@nestjs/common";
import { NotificationService } from "./notification.service";

@Controller('api/v2/notification')
export class NotificationController {
 constructor(
    private notificationService: NotificationService
 ) {}
}