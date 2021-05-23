import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AttemptEntity } from '../entities/attempt.entity';
import { Attempt, AttemptDocument } from 'src/schemas/attempt.schema';

export class AttemptDatasource {
  constructor(
    @InjectModel(Attempt.name) private model: Model<AttemptDocument>,
  ) {}

  findLastAttempt(entity: AttemptEntity): Promise<any> {
    return this.model
      .find({
        participant_id: {
          company_id: entity.company_id,
          campaign_id: entity.campaign_id,
          account_id: entity.account_id,
        },
        lesson_id: entity.lesson_id,
      })
      .sort({ created_id: -1 })
      .limit(1)
      .projection({})
      .exec();
  }

  save(
    entity: AttemptEntity,
  ): Promise<Pick<Attempt, '_id' | 'participant_id'>> {
    const model = new this.model({
      _id: entity.attempt_id,
      participant_id: {
        company_id: entity.company_id,
        campaign_id: entity.campaign_id,
        account_id: entity.account_id,
      },
      score: entity.score,
      bonus: entity.bonus,
      bonus_accepted: entity.bonus_accepted,
      answered_at: entity.answered_at,
      course_id: entity.course_id,
      lesson_id: entity.lesson_id,
      lesson_number: entity.lesson_number,
      lesson_name: entity.lesson_name,
      unit_id: entity.unit_id,
      unit_number: entity.unit_number,
      unit_name: entity.unit_name,
    });

    return model.save();
  }

  async insertManyAttempts(manyEntity: AttemptEntity[]): Promise<any> {
    const mapped = manyEntity.map((entity) => ({
      _id: entity.attempt_id,
      participant_id: {
        company_id: entity.company_id,
        campaign_id: entity.campaign_id,
        account_id: entity.account_id,
      },
      score: entity.score,
      bonus: entity.bonus,
      bonus_accepted: entity.bonus_accepted,
      answered_at: entity.answered_at,
      course_id: entity.course_id,
      lesson_id: entity.lesson_id,
      lesson_number: entity.lesson_number,
      lesson_name: entity.lesson_name,
      unit_id: entity.unit_id,
      unit_number: entity.unit_number,
      unit_name: entity.unit_name,
    }));

    return this.model.insertMany(mapped, { ordered: false });
  }
}
