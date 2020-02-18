import * as rp from 'request-promise-native';
import * as config from 'config';
import { Logger } from '@nestjs/common';

const token: string = config.get('telegram.token');
const chatId: string = config.get('telegram.chatId');

export class Telegram {
  public static async sendMessage(message, requestId = null) {
    const logger = new Logger(requestId || 'Telegram');

    let messageWithRequest: string = requestId
      ? `${message} [${requestId}]`
      : message;

    messageWithRequest += ` {${process.env.INSTANCE}`;
    const options = {
      method: 'POST',
      url: `https://api.telegram.org/bot${token}/sendMessage`,
      qs: { chat_id: chatId, text: messageWithRequest },
    };
    logger.log('Telegram: ' + message);

    (async () => {
      try {
        await rp(options);
      } catch (err) {
        logger.error('Telegram sending error. Message: ' + messageWithRequest);
      }
    })();
  }

  public static async sendImportantMessage(message, requestId = null) {
    const logger = new Logger(requestId || 'Telegram');

    let messageWithRequest: string = requestId
      ? `${message} [${requestId}]`
      : message;
    messageWithRequest += ` {${process.env.INSTANCE}`;

    const options = {
      method: 'POST',
      url: `https://api.telegram.org/bot${token}/sendMessage`,
      qs: { chat_id: chatId, text: messageWithRequest },
    };
    logger.log('Telegram: ' + message);

    try {
      await rp(options);
    } catch (err) {
      logger.error('Telegram sending error. Message: ' + messageWithRequest);
    }
  }
}
