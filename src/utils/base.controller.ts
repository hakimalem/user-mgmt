import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from './CustomHttpException';

export class BaseController {
  protected sendSuccessResponse(data?: any) {
    return { success: true, data: data ?? null };
  }

  protected sendErrorResponse(error: string, status: HttpStatus) {
    throw new CustomHttpException(false, error, status);
  }
}
