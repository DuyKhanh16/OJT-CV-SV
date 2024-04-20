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

  async sendMail(to: string, subject: string, name: string) {

    // Đọc template EJS từ file
    const template = fs.readFileSync('./src/templates/send-mail.ejs', 'utf-8');
    // Render template với dữ liệu từ formData
    const html = ejs.render(template, { name });

    const mailOptions = {
      from: 'khuongdanhhoang123@gmail.com',
      to: to,
      subject: subject,
      html,
    };

    return await this.transporter.sendMail(mailOptions);
  }

  async sendMailCancel(to: string, subject: string, name: string) {
    // Đọc template EJS từ file
    const template = fs.readFileSync('./src/templates/cancel-apply.ejs', 'utf-8');
    // Render template với dữ liệu từ formData
    const html = ejs.render(template, { name });

    const mailOptions = {
      from: 'khuongdanhhoang123@gmail.com',
      to: to,
      subject: subject,
      html,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
