import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { EmailInboxService } from './email.service';
import {EmailCount} from './email-count.model';
import { Logger } from '@nestjs/common';


@Controller('email')
export class EmailInboxController {
  private readonly logger = new Logger(EmailInboxService.name);
  constructor(private readonly emailService: EmailInboxService) {}

@Get('fetch-emails')
async fetchEmails(): Promise<{ emails: any[]; totalMessages: number, failureCount: number }> {
  return this.emailService.fetchEmails();
}
@Get('details')
async getAllEmailDetails(): Promise<EmailCount[]> {
  try {
    return await this.emailService.getAllEmailDetails();
  } catch (error) {
    throw error;
  }
}
@Post("add-user")
async createEmailCredentials(@Body('email') email: string, @Body('password') password: string) {
  try {
    const createdEmailCredentials = await this.emailService.create(email, password);
    return { message: 'Email credentials created successfully', data: createdEmailCredentials };
  } catch (error) {
    return { error: error.message };
  }
}
@Post("createwarmup")
async createWarmUp(@Body('emailAddress') emailAddress: string, @Body('emailSent')emailSent: number, @Body('warmupEmailSent') warmupEmailSent: number, @Body('Seen') Seen: number, @Body('Unseen') Unseen: number, @Body('isWarmUpOn') isWarmUpOn: boolean, @Body('isRampUpOn') isRampUpOn: boolean, @Body('isselected') isselected: boolean,  @Body('handleCardSelection') handleCardSelection: string){
  try {
    this.logger.log(`Creating warmup for ${emailAddress}`);
    const result = await this.emailService.createwarmup(emailAddress, emailSent, warmupEmailSent, Seen, Unseen, isWarmUpOn, isRampUpOn, isselected, handleCardSelection);
    this.logger.log(`Warmup created successfully for ${emailAddress}`);
    return { success: true, data: result };
  } catch (error) {
    this.logger.error(`Error creating warmup for ${emailAddress}: ${error.message}`);
    return { success: false, error: error.message };
  }
}
}
