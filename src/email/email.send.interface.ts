import { EmailAttachment } from './email.attachment';

export interface EmailSend {
  recipientEmails: string[];
  subject: string;
  payload: string;
  html?: string;
  requestId: string;
  userId: number;
  attachments?: EmailAttachment[];
}
