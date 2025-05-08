import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type HighscoreDocument = Highscore & Document;

@Schema({ collection: 'players', versionKey: false })
export class Highscore {
    @Prop({ required: true, trim: true })
    name!: string

    @Prop({ required: true })
    experience!: number

    @Prop({required: true})
    date!: number
}

export const HighscoreSchema = SchemaFactory.createForClass(Highscore)

HighscoreSchema.index({ date: -1 })
