import { Injectable } from '@nestjs/common';

const addDays = (segments, days) =>
  days > 0 ? segments.push(days + ' day' + (days === 1 ? '' : 's')) : segments;
const addHours = (segments, hours) =>
  hours > 0
    ? segments.push(hours + ' hour' + (hours === 1 ? '' : 's'))
    : segments;
const addMinutes = (segments, minutes) =>
  minutes > 0
    ? segments.push(minutes + ' minute' + (minutes === 1 ? '' : 's'))
    : segments;
const addSeconds = (segments, seconds) =>
  seconds > 0
    ? segments.push(seconds + ' second' + (seconds === 1 ? '' : 's'))
    : segments;

@Injectable()
export class AppService {
  getUptime(): { uptime: string } {
    const uptime = process.uptime();

    const date = new Date(uptime * 1000);
    const days = date.getUTCDate() - 1;
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    const segments = [];

    addDays(segments, days);
    addHours(segments, hours);
    addMinutes(segments, minutes);
    addSeconds(segments, seconds);

    return { uptime: segments.join(', ') };
  }
}
