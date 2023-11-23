import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://hungtd172600:PVCiboKo1sjbOrXF@cluster0.gsyvx5t.mongodb.net/?retryWrites=true&w=majority',
      {
        autoCreate: true,
      },
    ),
    EventModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
