import * as aws from 'aws-sdk';
import * as config from 'config';
import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/ses-transport';
import { Telegram } from '../lib/telegram';
import { EmailSend } from './email.send.interface';

export class EmailTransport {
  public constructor() {
    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY || config.get('aws.accessKeyId'),
      region: process.env.AWS_REGION || config.get('aws.region'),
      secretAccessKey:
        process.env.AWS_SECRET_KEY || config.get('aws.secretAccessKey'),
    });
  }

  public async send(emailData: EmailSend): Promise<void> {
    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
      }),
    });

    try {
      const info: SentMessageInfo = await transporter.sendMail({
        from: `Prosto App <${config.get('email.source')}>`,
        to: emailData.recipientEmails,
        subject: emailData.subject,
        text: emailData.payload,
        html: emailData.html,
        attachments: emailData.attachments ? emailData.attachments : null,
      });
      await this.success(
        info,
        emailData.userId,
        emailData.recipientEmails,
        emailData.requestId,
      );
    } catch (error) {
      await this.error(
        error,
        emailData.userId,
        emailData.recipientEmails,
        emailData.requestId,
      );
    }
  }

  /*tslint:disable*/
  private async success(
    data: SentMessageInfo,
    userId: number,
    recipientEmails: string[],
    requestId: string,
  ): Promise<void> {
    const message = `📧 Email sent with id ${data.messageId} and response: ${
      data.response
    } to ${recipientEmails.join(', ')} by UserId: ${userId}`;
    await Telegram.sendMessage(message, requestId);
  }

  private async error(
    error: Error,
    userId: number,
    recipientEmails: string[],
    requestId: string,
  ): Promise<void> {
    const message = `📮 Email sent ERROR: ${error} to ${recipientEmails.join(
      ', ',
    )} by UserId: ${userId}`;
    await Telegram.sendMessage(message, requestId);
  }
}
