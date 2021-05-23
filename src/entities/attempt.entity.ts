export class AttemptEntity {
  attempt_id: number;

  company_id: number;
  campaign_id: number;
  account_id: string;

  score: number;
  bonus: number;
  bonus_accepted: boolean;
  answered_at: Date;
  course_id: number;
  lesson_id: number;
  lesson_number: number;
  lesson_name: string;
  unit_id: number;
  unit_number: number;
  unit_name: string;
}
