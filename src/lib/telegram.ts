import * as rp from 'request-promise-native';
import * as config from 'config';

const token: string = config.get('telegram.token');
const chatId: string = config.get('telegram.chatId');

export class Telegram {
  public static async sendMessage(message) {
    const options = {
      method: 'POST',
      url: `https://api.telegram.org/bot${token}/sendMessage`,
      qs: { chat_id: chatId, text: message },
    };
    await rp(options);
  }
}
