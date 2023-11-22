import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './event.entity';
import { FilterQuery, Model } from 'mongoose';
import { CreateEventDto } from './event.type';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>
  ) {

  }

  find(option: FilterQuery<EventDocument>) {
    return this.eventModel.find(option)
  }

  count(options: FilterQuery<EventDocument>) {
    return this.eventModel.countDocuments(options).exec()
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = new this.eventModel(createEventDto);
    return newEvent.save();
  }

  async delete(eventId: string) {
    const result = await this.eventModel.deleteOne({ id: eventId }).exec();
    if (!result?.deletedCount) {
      throw new NotFoundException('Event not found!');
    }
    return {
      message: 'Delete Event Success!',
    };
  }
}
