import { MailerService } from '@nestjs-modules/mailer'
import { Body, Controller, Post } from '@nestjs/common'
import * as dotenv from 'dotenv'

dotenv.config()

@Controller('wiki')
export class WikiController {
  constructor(private readonly mailerService: MailerService) { }

  @Post('send-suggestion')
  async sendSuggestion(
    @Body() body: { content: string, source: string, author: string }
  ): Promise<{ message: string }> {
    const { content, source, author } = body

    await this.mailerService.sendMail({
      to: process.env.SMTP_RECIPIENT,
      subject: `New Wiki Suggestion for ${source} by ${author}`,
      text: `Content: ${content}`
    })

    return { message: 'Suggestion sent successfully' }
  }
}
