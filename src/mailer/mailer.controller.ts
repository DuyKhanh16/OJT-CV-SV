import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mailer.service';
// import { MailService } from './mail/mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendEmail(@Body() body: any) {
    const { to, subject, text } = body;
    console.log(to, subject, text);
    return this.mailService.sendMail(to, subject, text);
  }
}
