import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './event.entity';
import { FilterQuery, Model } from 'mongoose';
import { CreateEventDto, UpdateEventDto } from './event.type';

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
    try {
      if (!createEventDto.name) {
        throw new BadRequestException('Missing name');
      }

      const newEvent = new this.eventModel(createEventDto);
      const savedEvent = await newEvent.save();

      if (!savedEvent) {
        throw new Error('Failed to save event');
      }

      return savedEvent;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to create event');
    }
  }

  async update(eventId: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const existingEvent = await this.eventModel.findOne({ id: eventId }).exec();

    if (!existingEvent) {
      throw new NotFoundException('Event not found');
    }

    if (updateEventDto.name) {
      existingEvent.name = updateEventDto.name;
    }
    if (updateEventDto.description) {
      existingEvent.description = updateEventDto.description;
    }
    if (updateEventDto.location) {
      existingEvent.location = updateEventDto.location;
    }
    if (updateEventDto.imageUrl) {
      existingEvent.imageUrl = updateEventDto.imageUrl;
    }
    if (updateEventDto.date) {
      existingEvent.date = updateEventDto.date;
    }

    const updatedEvent = await existingEvent.save();
    return updatedEvent;
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
