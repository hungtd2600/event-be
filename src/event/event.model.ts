import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  date: Date;

  @Prop()
  location: string;

  @Prop()
  imageUrl: string;

  @Prop()
  imageData: { type: Buffer; contentType: string };
}

export const EventSchema = SchemaFactory.createForClass(Event);
