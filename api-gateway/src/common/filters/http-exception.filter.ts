import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const messageError =
      exception instanceof HttpException ? exception.getResponse() : exception;

    this.logger.error(
      `Status ${status} Error: ${JSON.stringify(messageError)}`,
    );

    response.status(status).json({
      timeStamp: new Date().toISOString(),
      path: request.url,
      error: messageError,
    });
  }
}
