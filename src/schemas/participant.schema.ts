import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ParticipantDocument = Participant & Document;

@Schema()
export class CustomId {
  @Prop()
  company_id: number;

  @Prop()
  campaign_id: number;

  @Prop()
  account_id: string;
}

@Schema({
  collection: 'participants_load_test',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Participant {
  @Prop({ required: true })
  _id: CustomId;

  @Prop()
  campaign_name: string;

  @Prop({ required: true })
  campaign_bonus_delay: number;

  @Prop({ required: true, index: true })
  campaign_start_date: Date;

  @Prop({ required: true, index: true })
  campaign_end_date: Date;

  @Prop()
  account_name: string;

  @Prop()
  account_profile: string;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
