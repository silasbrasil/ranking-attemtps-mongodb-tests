import { Controller } from '@nestjs/common';
import { AttemptDatasource } from './datasources/attempt.datasource';
import { ParticipantDatasource } from './datasources/participant.datasource';
import * as Leite from 'leite';
import { RankingDatasource } from './datasources/ranking.datasource';
const leite = new Leite();

@Controller()
export class AppController {
  constructor(
    private participantDatasource: ParticipantDatasource,
    private attemptDatasource: AttemptDatasource,
    private rankingDatasource: RankingDatasource,
  ) {
    // this.getRanking().then(() => console.log('Finished!'));
    // this.getLastAttempt().then(() => console.log('Finished!!!'));
    // this.createDatbaseSample().then(() =>
    //   console.log('Database sample created'),
    // );
  }

  async getLastAttempt() {
    const company = 2;
    const campaign = 2;
    const account = '69169816794';

    // { _id: '69169816794', max_score: 100, bonus_sum: 34997 },
    // { _id: '33527559140', max_score: 100, bonus_sum: 33756 },
    // { _id: '04865507370', max_score: 100, bonus_sum: 33743 },
    // { _id: '79154112842', max_score: 100, bonus_sum: 33639 },
    // { _id: '32230433300', max_score: 100, bonus_sum: 33276 },
    // { _id: '86307034742', max_score: 100, bonus_sum: 33216 },
    // { _id: '90072178108', max_score: 100, bonus_sum: 33200 },
    // { _id: '18141413406', max_score: 100, bonus_sum: 33159 },
    // { _id: '67812007472', max_score: 100, bonus_sum: 33127 },
    // { _id: '53970376564', max_score: 100, bonus_sum: 33055 }

    const start = Date.now();
    const lastAttempt = await this.rankingDatasource.lastAttempt(
      company,
      campaign,
      account,
    );
    const end = Date.now();
    console.log(lastAttempt);
    console.log(`Time: ${end - start}`);
  }

  async getRanking(): Promise<void> {
    const campaign = 2;
    const company = 2;
    const start = Date.now();
    console.log('Building ranking');
    const ranking = await this.rankingDatasource.ranking(company, campaign);
    const end = Date.now();
    console.log(ranking);
    console.log(`Time: ${end - start}`);
  }

  async createDatbaseSample() {
    for (let company_id = 1; company_id < 51; company_id++) {
      for (let campaign_id = 1; campaign_id < 15; campaign_id++) {
        await this.insertManyParticipantPerCampaign(company_id, campaign_id);
      }
    }
  }

  async insertManyParticipantPerCampaign(
    company_id: number,
    campaign_id: number,
  ) {
    const now = new Date();
    now.setMonth(now.getMonth() + 1);
    const nextMonth = new Date(now);

    for (let i = 0; i < 100; i++) {
      const participant = {
        company_id: company_id,

        account_id: leite.pessoa.cpf(),
        account_name: leite.pessoa.nome(),
        account_profile: leite.pessoa.email(),

        campaign_id: campaign_id,

        campaign_name: leite.localizacao.cidade(),
        campaign_bonus_delay: 8,
        campaign_start_date: now,
        campaign_end_date: nextMonth,
      };

      try {
        console.log(
          `Participant ${participant.account_id} of campaign ${campaign_id}, company ${company_id} created`,
        );
        await this.participantDatasource.save(participant);
      } catch (err) {
        console.log(err);
      }

      try {
        await this.insertManyAttemptPerParticipant(
          company_id,
          campaign_id,
          participant.account_id,
        );
      } catch (err) {
        console.log(
          'Errors count in many participant insertation',
          err.writeErrors.length,
        );
      }
    }
  }

  async insertManyAttemptPerParticipant(
    company_id: number,
    campaign_id: number,
    account_id: string,
  ) {
    const attemptArr = [];
    for (let j = 0; j < 1500; j++) {
      const attempt = {
        attempt_id: leite.localizacao.cep(),

        company_id: company_id,
        campaign_id: campaign_id,
        account_id: account_id,

        score: leite.pessoa.idade({ min: 1, max: 100 }),
        bonus: leite.pessoa.idade({ min: 1, max: 50 }),
        bonus_accepted: leite.pessoa.sexo() === 'Masculino' ? true : false,
        answered_at: new Date(),
        course_id: leite.localizacao.cep(),
        lesson_id: leite.localizacao.cep(),
        lesson_number: leite.localizacao.cep(),
        lesson_name: leite.localizacao.logradouro(),
        unit_id: leite.localizacao.cep(),
        unit_number: leite.localizacao.cep(),
        unit_name: leite.localizacao.logradouro(),
      };

      attemptArr.push(attempt);
    }

    try {
      console.log('Inserting many attempts');
      await this.attemptDatasource.insertManyAttempts(attemptArr);
    } catch (err) {
      console.log('Error count to many attempts inserts');
      console.log(err.writeErrors.length);
    }
  }
}
