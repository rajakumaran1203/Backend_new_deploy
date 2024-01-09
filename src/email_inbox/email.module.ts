import { Module } from '@nestjs/common';
import { EmailInboxService } from './email.service';
import {EmailInboxController} from './email.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailCountSchema } from './email-count.model';
import {EmailCredentials, EmailCredentialsSchema} from './user_details';
import {EmailWarmUpSchema} from './warmup.model';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'EmailCount', schema: EmailCountSchema }]),
  MongooseModule.forFeature([{ name: 'EmailCredentials', schema: EmailCredentialsSchema }]),
MongooseModule.forFeature([{ name: 'EmailWarmUp', schema: EmailWarmUpSchema }])],
  controllers: [EmailInboxController],
  providers: [EmailInboxService],
})
export class EmailInboxModule {}
