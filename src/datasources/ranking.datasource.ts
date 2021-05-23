import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attempt, AttemptDocument } from 'src/schemas/attempt.schema';

export class RankingDatasource {
  constructor(
    @InjectModel(Attempt.name) private model: Model<AttemptDocument>,
  ) {}

  async ranking(company: number, campaign: number): Promise<any> {
    return this.model
      .aggregate()
      .match({
        'participant_id.company_id': company,
        'participant_id.campaign_id': campaign,
        bonus_accepted: true,
      })
      .group({
        _id: '$participant_id.account_id',
        max_score: { $max: '$score' },
        bonus_sum: { $sum: '$bonus' },
      })
      .sort({
        bonus_sum: -1,
      })
      .limit(10)
      .exec();
  }

  async lastAttempt(company: number, campaign: number, account): Promise<any> {
    return this.model
      .aggregate()
      .match({
        'participant_id.company_id': company,
        'participant_id.campaign_id': campaign,
        'participant_id.account_id': account,
        bonus_accepted: true,
      })
      .sort({
        created_at: -1,
      })
      .limit(1)
      .exec();
  }
}
