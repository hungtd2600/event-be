import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://hungtd172600:PVCiboKo1sjbOrXF@cluster0.gsyvx5t.mongodb.net/?retryWrites=true&w=majority', {
      autoCreate: true
    }),
    EventModule],
  controllers: [],
  providers: []
})
export class AppModule { }
