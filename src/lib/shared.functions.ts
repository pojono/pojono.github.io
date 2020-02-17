import { extname } from 'path';
import { Logger } from '@nestjs/common';
import { Assert } from './assert';
import { UPLOAD_ERROR } from './errors';

const Jimp = require('jimp');
const PREVIEW_EXTENSION = 'png';
const logger = new Logger('Shared Functions');

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
}
