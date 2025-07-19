import { MailerService } from '@nestjs-modules/mailer'
import { Body, Controller, Get, Post } from '@nestjs/common'
import * as dotenv from 'dotenv'
import axios from 'axios'
import { differenceInMinutes } from 'date-fns'

dotenv.config()

type World = {
  name: string,
  last_update: string
}

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

  @Get('worldMarketUpdates')
  async worldMarketUpdates(): Promise<{ message: string }> {
    const response = await axios.get('https://api.tibiamarket.top:8001/world_data', {
      headers: {
        Authorization: `Bearer ${process.env.MARKET_TOKEN}`,
      }
    });
    const worlds = response.data as Array<World>
    const currentDate = new Date()
    const acceptedWorlds = [
      'Xyla', 'Bona', 'Celesta', 'Dia', 'Harmonia', 'Karmeya',
      'Nevia', 'Refugia', 'Thyria', 'Vunira', 'Monza', 'Secura',
      'Peloria', 'Antica'
    ]
    const filteredWorlds = worlds.filter(world => acceptedWorlds.includes(world.name))
    const updatedWorlds = filteredWorlds.filter(world => differenceInMinutes(currentDate, new Date(world.last_update)) < 100)

    if (updatedWorlds.length === 0) {
      return { message: 'No updated worlds found' }
    }

    const message = updatedWorlds
      .map(world => `🌍 ${world.name} updated ${differenceInMinutes(currentDate, new Date(world.last_update))} minutes ago`)
      .join('\n')

    await axios.post(process.env.DISCORD_WEBHOOK!, {
      content: `📢 **World Market Updates**:\n${message}`
    });

    return { message: 'Update posted to Discord successfully' };
  }
}
