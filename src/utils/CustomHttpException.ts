import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  success: boolean;
  error: string;

  constructor(success: boolean = false, error: string, status: HttpStatus) {
    super(error, status);
    this.success = success;
    this.error = error;
  }

  getResponse(): any {
    return {
      success: this.success,
      error: this.error,
      statusCode: this.getStatus(),
    };
  }
}
