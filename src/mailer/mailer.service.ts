// src/mail/mail.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as fs from 'fs';
require('dotenv').config();

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        auth: {
            user: 'khuongdanhhoang123@gmail.com',
            pass: 'xkprzeomjqsdbahu'
        }
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'khuongdanhhoang123@gmail.com',
      to: to,
      subject: subject,
      text: text,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
