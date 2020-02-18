import { extname } from 'path';
import { Logger } from '@nestjs/common';
import { Assert } from './assert';
import { UPLOAD_ERROR } from './errors';

const Jimp = require('jimp');
const PREVIEW_EXTENSION = 'png';
const logger = new Logger('Shared Functions');

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

export default class SharedFunctions {
  static generateRandomFileName(file) {
    const randomName: string = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return {
      name: `${randomName}${extname(file.originalname)}`,
      preview: `${randomName}.${PREVIEW_EXTENSION}`,
    };
  }

  static async resizePicture(
    pictureBuffer: Buffer,
    width: number,
  ): Promise<Buffer> {
    try {
      const pictureInstance = await Jimp.read(pictureBuffer);
      const resizedPicture = await pictureInstance.resize(width, Jimp.AUTO);
      return resizedPicture.getBufferAsync(pictureInstance.getMIME());
    } catch (error) {
      logger.log(`${error.message}, ${error.name}`);
      Assert.isNotExist(error, UPLOAD_ERROR);
    }
  }

  static uptime(): string {
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

    return segments.join(', ');
  }
}
