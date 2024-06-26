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
        user:"khuongdanhhoang123@gmail.coml",
        pass:"xkprzeomjqsdbahu"
      },
    });
  }

  async sendEmailRegister(formData: any) {
    const {toList, subject, name} = formData;

    // Đọc template EJS từ file
    const template = fs.readFileSync('./src/templates/send-mail.ejs', 'utf-8');
    // Render template với dữ liệu từ formData
    const html = ejs.render(template, { name});

    for (const to of toList) {
      const mailOptions = {
        from: "khuongdanhhoang123@gmail.com",
        to,
        subject,
        html, // Sử dụng HTML thay vì text
      };

      try {
        await this.transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Error sending email: ', error);
      }
    }
  }

  async sendEmailCancel(formData: any) {
    const {toList, subject, name} = formData;

    // Đọc template EJS từ file
    const template = fs.readFileSync('./src/templates/cancel-apply.ejs', 'utf-8');
    // Render template với dữ liệu từ formData
    const html = ejs.render(template, { name});

    for (const to of toList) {
      const mailOptions = {
        from: "topcvdemo@gmail",
        to,
        subject,
        html, // Sử dụng HTML thay vì text
      };

      try {
        await this.transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Error sending email: ', error);
      }
    }
  }
}
