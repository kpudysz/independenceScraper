import { Controller, Get, Post, Query } from '@nestjs/common';
import { HighscoresService } from './highscores.service'

@Controller('highscores')
export class HighscoresController {
    constructor(private readonly highscoresService: HighscoresService) {}
    @Get()
    async getHighscores(
        @Query('dateFrom') dateFrom?: number,
        @Query('dateTo') dateTo?: number
        ) {

        return this.highscoresService.findHighscores(dateFrom, dateTo)
        }
    @Post('scrape')
    async scrapPlayers() {
        return this.highscoresService.scrapeHighscores()
    }
    @Get('healthCheck')
    async healthCheck(){
        return 'Ok'
    }
}


