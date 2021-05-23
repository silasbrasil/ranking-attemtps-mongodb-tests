import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AttemptDatasource } from './datasources/attempt.datasource';
import { ParticipantDatasource } from './datasources/participant.datasource';
import { RankingDatasource } from './datasources/ranking.datasource';
import { Attempt, AttemptSchema } from './schemas/attempt.schema';
import { Participant, ParticipantSchema } from './schemas/participant.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://ranking:ranking@localhost:27017/ranking-campaign?authSource=admin',
    ),
    MongooseModule.forFeature([
      { name: Attempt.name, schema: AttemptSchema },
      { name: Participant.name, schema: ParticipantSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [ParticipantDatasource, AttemptDatasource, RankingDatasource],
})
export class AppModule {}
