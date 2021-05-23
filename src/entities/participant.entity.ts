export class ParticipantEntity {
  company_id: number;

  account_id: string;
  account_name: string;
  account_profile: string;

  campaign_id: number;
  campaign_name: string;
  campaign_bonus_delay: number;
  campaign_start_date: Date;
  campaign_end_date: Date;
}
