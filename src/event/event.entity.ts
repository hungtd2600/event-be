import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from 'mongoose'
import { Factory } from "nestjs-seeder"

export type EventDocument = Event & Document

@Schema()
export class Event {
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