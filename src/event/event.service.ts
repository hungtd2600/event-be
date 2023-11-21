import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './event.entity';
import { FilterQuery, Model } from 'mongoose';

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
}
