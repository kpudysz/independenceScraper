import { Controller, Post, Body } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Controller('wiki')
export class WikiController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send-suggestion')
  async sendSuggestion(
    @Body() body: { content: string, source: string, author: string }
  ) : Promise<{ message: string }> {
    const { content, source, author } = body

    await this.mailerService.sendMail({
      to: 'krzysztofpudysz97@gmail.com',
      subject: `New Wiki Suggestion for ${source} by ${author}`,
      text: `Content: ${content}`
    })

    return { message: 'Suggestion sent successfully' }
  }
}
