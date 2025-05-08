import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { Highscore, HighscoreDocument } from './schemas/highscore.schema'
import { ConfigService } from '@nestjs/config'
import { scrapPlayersFromHighscores } from '../../functions'

@Injectable()
export class HighscoresService {
    constructor(
        @InjectModel(Highscore.name) private highscoreModel: Model<HighscoreDocument>,
        private configService: ConfigService,
    ) {}

    /**
     * Retrieves interval of highscores based on dateFrom and dateTo from the database, sorted by date descending.
     */
    async findHighscores(dateFrom?: number, dateTo?: number): Promise<Highscore[]> {
        try {
            const filter: FilterQuery<Highscore> = {}

            if (dateFrom !== undefined || dateTo !== undefined) {
                filter.date = {}
            }

            if (dateFrom !== undefined) {
                filter.date.$gte = dateFrom
            }

            if (dateTo !== undefined) {
                filter.date.$lte = dateTo
            }

            return await this.highscoreModel.find(filter).select('-_id').sort({ date: -1 }).exec()
        } catch (error) {
            throw new InternalServerErrorException('Could not retrieve highscores.')
        }
    }

    /**
     * Scrapes highscores from the target website and saves them to the database.
     */
    async scrapeHighscores(): Promise<{ message: string, count: number }> {
        try {
            const updatedPlayers = await scrapPlayersFromHighscores()

            if (!updatedPlayers || updatedPlayers.length === 0) {
                return { message: 'No players scraped', count: 0 }
            }

            const result = await this.highscoreModel.insertMany(updatedPlayers)

            return {
                message: 'Saved successfully',
                count: result.length
            }
        } catch (error) {
            throw new InternalServerErrorException('Failed to scrape and save players')
        }
    }
}
