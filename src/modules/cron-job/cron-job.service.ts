import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { BackendLogger } from 'common/logger/backend-logger';
import { CronJob } from 'cron';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class CronJobService {
  private readonly logger = new BackendLogger(CronJobService.name);
  private pubSub: PubSub;

  constructor(private schedulerRegistry: SchedulerRegistry) {
    this.pubSub = new PubSub();
  }

  // * * * * * *
  // | | | | | |
  // | | | | | day of week
  // | | | | months
  // | | | day of month
  // | | hours
  // | minutes
  // seconds(optional);

  // @Interval('notifications',10000)
  @Cron('0 * * * * * ', {
    name: 'notifications',
    timeZone: 'Europe/Paris',
  })
  async testCronjob() {
    this.logger.log('This is cron job!');
  }

  // @Subscription(() => QuestWorkerDto, {
  //   filter: (payload: any, variables: any) => {
  //     if (!payload.userIds.includes(variables.userId)) {
  //       payload.handleNewQuestReward.newQuestReward = false;
  //     }
  //     return true;
  //   },
  // })
  // async handleNewQuestReward(@Args('userId') userId: string) {
  //   return this.pubSub.asyncIterator('handleNewQuestReward');
  // }

  addCronJob(name: string, seconds: string) {
    const job = new CronJob(`${seconds} * * * * *`, () => {
      this.logger.warn(`time (${seconds}) for job ${name} to run!`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(
      `job ${name} added for each minute at ${seconds} seconds!`,
    );
  }
}
