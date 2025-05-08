import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { HighscoresController } from './highscores.controller'
import { HighscoresService } from './highscores.service'
import { Highscore, HighscoreSchema } from './schemas/highscore.schema'

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Highscore.name, schema: HighscoreSchema }])
  ],
  controllers: [HighscoresController, ],
  providers: [HighscoresService]
})

export class HighscoresModule {}
