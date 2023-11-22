import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Model } from 'mongoose'
import { Factory } from "nestjs-seeder"
import { v4 as uuidv4 } from 'uuid'

export type EventDocument = Event & Document

@Schema()
export class Event {

  @Factory(() => uuidv4())
  @Prop({ type: String })
  id: string;

  @Factory(faker => faker.lorem.words(2))
  @Prop()
  name: string

  @Factory(faker => faker.date.past())
  @Prop()
  date: Date

  @Factory(faker => faker.lorem.words(10))
  @Prop()
  location: string

  @Factory(faker => faker.image.imageUrl())
  @Prop()
  imageUrl: string

  @Factory(faker => faker.lorem.words(50))
  @Prop()
  description: string
}

export const EventSchema = SchemaFactory.createForClass(Event)