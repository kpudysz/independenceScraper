import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { HighscoresModule } from './highscores'
import { WikiModule } from './wiki'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI')
            }),
            inject: [ConfigService],
        }),
        HighscoresModule,
        WikiModule
    ]
})
export class AppModule {}
