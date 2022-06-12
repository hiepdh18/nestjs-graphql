import { AuthModule } from './modules/auth/auth.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronJobModule } from './modules/cron-job/cron-job.module';
import { MailModule } from './modules/mail/mail.module';
import { UserModule } from './modules/user/user.module';
import { EventsModule } from './modules/events/events.module';
import { SocketModule } from './modules/socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
    }),
    TypegooseModule.forRoot(process.env.MONGO_URL),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      // wildcard: false,
      // the delimiter used to segment namespaces
      // delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      // newListener: false,
      // set this to `true` if you want to emit the removeListener event
      // removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      // maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      // verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      // ignoreErrors: false,
    }),
    AuthModule,
    UserModule,
    MailModule,
    CronJobModule,
    EventsModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
