import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomId, Participant } from './participant.schema';

export type AttemptDocument = Attempt & Document;

@Schema({
  collection: 'attempts_load_test',
  timestamps: { createdAt: 'created_at', updatedAt: 'update_at' },
})
export class Attempt {
  @Prop({ required: true })
  _id: number;

  @Prop({ required: true, ref: Participant.name })
  participant_id: CustomId;

  @Prop({ required: true })
  score: number;

  @Prop()
  bonus: number;

  @Prop({ required: true })
  bonus_accepted: boolean;

  @Prop({ required: true })
  answered_at: Date;

  @Prop({ required: true })
  course_id: number;

  @Prop({ required: true })
  lesson_id: number;

  @Prop({ required: true, type: Number })
  lesson_number: number;

  @Prop()
  lesson_name: string;

  @Prop({ required: true })
  unit_id: number;

  @Prop({ required: true })
  unit_number: number;

  @Prop()
  unit_name: string;
}

export const AttemptSchema = SchemaFactory.createForClass(Attempt);
AttemptSchema.index({ created_at: 1 });
