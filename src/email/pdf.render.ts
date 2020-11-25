import * as pdf from 'html-pdf';
import { CreateOptions, CreateResult } from 'html-pdf';

export class PdfRender {
  static async renderPdf(html: string): Promise<Buffer> {
    const params: CreateOptions = {
      format: 'A4',
      orientation: 'portrait',
      footer: { height: '0' },
    };

    const pdfCreateResult: CreateResult = await pdf.create(html, params);

    return new Promise((resolve, reject) => {
      pdfCreateResult.toBuffer((err, buffer) => {
        if (err) {
          reject(err);
        }
        resolve(buffer);
      });
    });
  }
}
