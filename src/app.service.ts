import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUptime(): { uptime: string } {
    const uptime = process.uptime();

    const date = new Date(uptime * 1000);
    const days = date.getUTCDate() - 1;
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = date.getUTCMilliseconds();

    const segments = [];

    if (days > 0) {
      segments.push(days + ' day' + (days === 1 ? '' : 's'));
    }
    if (hours > 0) {
      segments.push(hours + ' hour' + (hours === 1 ? '' : 's'));
    }
    if (minutes > 0) {
      segments.push(minutes + ' minute' + (minutes === 1 ? '' : 's'));
    }
    if (seconds > 0) {
      segments.push(seconds + ' second' + (seconds === 1 ? '' : 's'));
    }
    if (milliseconds > 0) {
      segments.push(milliseconds + ' m' + (seconds === 1 ? '' : 's'));
    }
    return { uptime: segments.join(', ') };
  }
}
