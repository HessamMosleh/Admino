import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`,
      {
        useNewUrlParser: true,
      },
    ),
  ],
})
export class MongodbModule {}
