import { Injectable } from '@nestjs/common';
import SharedFunctions from './lib/shared.functions';

const os = require('os');

@Injectable()
export class AppService {
  humanFileSize(bytes, si) {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
  }

  getUptime(): { uptime: string; tag: string; instance: string; system: any } {
    return {
      uptime: SharedFunctions.uptime(),
      tag: process.env.TAG,
      instance: process.env.INSTANCE,
      system: {
        freemem: this.humanFileSize(os.freemem(), false),
        totalmem: this.humanFileSize(os.totalmem(), false),
        loadavg: os.loadavg().map(load => load.toFixed(2)),
        percent: ((os.freemem() / os.totalmem()) * 100).toFixed(2),
        cpus: os.cpus(),
      },
    };
  }
}
