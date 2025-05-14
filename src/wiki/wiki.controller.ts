import { Controller, Post, Body, Res } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { Response } from 'express'
import { Throttle } from '@nestjs/throttler'

@Controller('wiki')
export class WikiController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send-suggestion')
  @Throttle({ default: { limit: 5, ttl: 3600 } })
  async sendSuggestion(
    @Body('content') content: string,
    @Body('source') source: string,
    @Body('author') author: string,
    @Res() res: Response
  ) {
    try {
      await this.mailerService.sendMail({
        to: 'krzysztofpudysz97@gmail.com',
        subject: `New Wiki Suggestion for ${source} by ${author}`,
        text: `Content: ${content}`
      })
      return res.status(200).send({ status: 'ok' })
    } catch (error) {
      return res.status(500).send({ status: 'error', message: error as string })
    }
  }
}
