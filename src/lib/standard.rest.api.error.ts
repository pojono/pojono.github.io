export class StandardRestApiError {
  private readonly code: number;
  private readonly message: string;

  private constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  public static create(code: number, message: string): StandardRestApiError {
    return new StandardRestApiError(code, message);
  }

  public getCode(): number {
    return this.code;
  }

  public getMessage(): string {
    return this.message;
  }
}
