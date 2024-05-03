// src/mail/mail.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as fs from 'fs';
import { async } from 'rxjs';
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

  async sendMailCancel(to: string, subject: string, name: string,Company :string) {
    // Đọc template EJS từ file
    const template = fs.readFileSync('./src/templates/cancel-apply.ejs', 'utf-8');
    // Render template với dữ liệu từ formData
    const html = ejs.render(template, { name,Company });

    const mailOptions = {
      from: 'khuongdanhhoang123@gmail.com',
      to: to,
      subject: subject,
      html,
    };
    return await this.transporter.sendMail(mailOptions);
  }

  async sendMailInterview(to: string, subject: string, name: string,day:string,address :string,Company :string,emailcompany :string) {
     // Đọc template EJS từ file
     const template = fs.readFileSync('./src/templates/interview.ejs', 'utf-8');
     // Render template với dữ liệu từ formData
     const html = ejs.render(template, { name, day,address,Company,emailcompany});
 
     const mailOptions = {
       from: emailcompany,
       to: to,
       subject: subject,
       html,
     };
 
     return await this.transporter.sendMail(mailOptions);
  }

  async sendMailRegister(to: string, subject: string, name: string) {
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

  async sendMailForgotPassword(to: string, subject: string,name:any) {
    console.log(to, subject, name);
    // Đọc template EJS tự file
    const template = fs.readFileSync('./src/templates/forgot-password.ejs', 'utf-8');
    // Render template với dữ liệu từ formData
    const html = ejs.render(template, {name});

    const mailOptions = {
      from: 'RikkeiCV@gmail.com',
      to: to,
      subject: subject,
      html,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
