import { Controller , Post ,Get, Body} from "@nestjs/common";
import { EmailService, } from "./email.service";


@Controller('email')
export class EmailController {
    constructor(private readonly emailService : EmailService) {}

    @Get()
    async getAllTemplates() {
      const emails = await this.emailService.findAll();
      return emails;
    }
    
    @Post('send-email')
    async sendEmail(@Body() formData:any ) {
        const {to, subject, text} = formData 

        try{
            await this.emailService.sendEmail(to, subject, text);
            return 'successfully sent !'
        } catch (error) {
            return {success: false ,message : 'failed to send email'}
        }
    }
}

@Controller('emaillists')
export class EmailListController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  async getEmails(): Promise<{ value: string; label: string }[]> {
    return this.emailService.getEmails();
  }
}


