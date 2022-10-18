import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DATABASE_URL,
      process.env.MONGO_PASSWORD
        ? {
            authSource: 'admin',
            user: process.env.MONGO_USER,
            pass: process.env.MONGO_PASSWORD,
          }
        : undefined,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
