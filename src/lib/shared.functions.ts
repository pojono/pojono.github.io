import { extname } from 'path';

export default class SharedFunctions {
  static generateRandomFileName(file) {
    const randomName: string = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return `${randomName}${extname(file.originalname)}`;
  }
}
