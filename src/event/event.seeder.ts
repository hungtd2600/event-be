import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DataFactory, Seeder } from "nestjs-seeder";
import { Event, EventDocument } from "./event.entity";

export class EventSeeder implements Seeder {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>
  ) {

  }

  drop(): Promise<any> {
    return this.eventModel.deleteMany({}) as any
  }

  seed(): Promise<any> {
    const event: any = DataFactory.createForClass(Event).generate(50)
    return this.eventModel.insertMany(event)
  }
}