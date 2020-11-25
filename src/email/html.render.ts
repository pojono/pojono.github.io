import * as ejs from 'ejs';
import * as fs from 'fs';
import { promisify } from 'util';
import {
  giftCertificateTemplatePath,
  resetGiftEmailTemplatePath,
} from './template.list';
const readFileAsync = promisify(fs.readFile);

export class HtmlRender {
  static async renderGiftEmail(data: { resetLink: string }): Promise<string> {
    return HtmlRender.renderHtml(resetGiftEmailTemplatePath, data);
  }

  static async renderGiftCertificate(data: {
    resetLink: string;
  }): Promise<string> {
    return HtmlRender.renderHtml(giftCertificateTemplatePath, data);
  }

  static async renderHtml(
    templatePath: string,
    data: Record<string, unknown>,
  ): Promise<any> {
    const template = await readFileAsync(templatePath);
    const options: ejs.Options = {
      filename: templatePath,
      cache: true,
    };
    return ejs.compile(template.toString(), options)(data);
  }
}
