import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Participant,
  ParticipantDocument,
} from 'src/schemas/participant.schema';
import { ParticipantEntity } from 'src/entities/participant.entity';

@Injectable()
export class ParticipantDatasource {
  constructor(
    @InjectModel(Participant.name) private model: Model<ParticipantDocument>,
  ) {}

  save(
    entity: ParticipantEntity,
  ): Promise<Pick<Participant, '_id' | 'account_name'>> {
    const participant = new this.model({
      _id: {
        company_id: entity.company_id,
        campaign_id: entity.campaign_id,
        account_id: entity.account_id,
      },
      campaign_name: entity.campaign_name,
      campaign_bonus_delay: entity.campaign_bonus_delay,
      campaign_start_date: entity.campaign_start_date,
      campaign_end_date: entity.campaign_end_date,
      account_name: entity.account_name,
      account_profile: entity.account_profile,
    });

    return participant.save();
  }

  listAllParticipants(): Promise<Pick<Participant, '_id' | 'account_name'>[]> {
    return this.model.find({}, { account_name: 1 }).exec();
  }

  insertManyParticipant(manyEntity: ParticipantEntity[]) {
    const mapped = manyEntity.map((entity) => ({
      _id: {
        company_id: entity.company_id,
        campaign_id: entity.campaign_id,
        account_id: entity.account_id,
      },
      campaign_name: entity.campaign_name,
      campaign_bonus_delay: entity.campaign_bonus_delay,
      campaign_start_date: entity.campaign_start_date,
      campaign_end_date: entity.campaign_end_date,
      account_name: entity.account_name,
      account_profile: entity.account_profile,
    }));

    return this.model.insertMany(mapped, { ordered: false });
  }

  dropCollection(): Promise<void> {
    return this.model.collection.drop();
  }
}
