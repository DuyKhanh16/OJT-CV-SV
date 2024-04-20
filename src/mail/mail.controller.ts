import { Controller, Get, Res } from "@nestjs/common";
import { MailService } from "./mail.service";
import { log } from "console";

@Controller('api/v2/mail')
export class MailController {
    constructor(
        private readonly mailService: MailService
    ) {}

    @Get('send')
    async sendEmail(@Res() res) {
        const formdata:any= {}
            formdata.toList =["khuongdanhhoang123@gmail.com",],
            formdata.subject ="wellcome",
            formdata.name ="Khanh"
        
        try {
            await this.mailService.sendEmailRegister(formdata);
            res.send('ok');
        } catch (error) {
            log(error);
            res.send('error');
        }
    }
}