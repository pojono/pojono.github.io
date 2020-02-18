import { Injectable } from '@nestjs/common';
import SharedFunctions from './lib/shared.functions';

@Injectable()
export class AppService {
  getUptime(): { uptime: string; tag: string; instance: string } {
    return {
      uptime: SharedFunctions.uptime(),
      tag: process.env.TAG,
      instance: process.env.INSTANCE,
    };
  }
}
