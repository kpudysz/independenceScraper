import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { WikiController } from './wiki.controller'

dotenv.config()

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    }),
  ],
  controllers: [WikiController],
})
export class WikiModule { }
