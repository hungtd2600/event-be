import { seeder } from "nestjs-seeder";
import { EventSeeder } from "./event.seeder";
import { MongooseModule } from "@nestjs/mongoose";
import { EventSchema } from "./event.entity";

seeder({
  imports: [
    MongooseModule.forRoot('mongodb+srv://hungtd172600:PVCiboKo1sjbOrXF@cluster0.gsyvx5t.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ]
}).run([EventSeeder])