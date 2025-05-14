import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { WikiController } from './wiki.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'gengarguntrip@gmail.com',
          pass: 'jbainzekrbfxfzgx',
        },
      },
    }),
  ],
  controllers: [WikiController],
})
export class WikiModule {}
