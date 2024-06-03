import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { InputError } from '../errors/input-error';
import { InternalError } from '../errors/internal-error';

// TODO add more possibilities to handle errors

@Catch()
export class AllExceptionsFilter implements ExceptionFilter<unknown> {
    private readonly logger = new Logger(AllExceptionsFilter.name);
    async catch(error: any, host: ArgumentsHost) {
        this.logger.error(error);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let message = '';
        let statusCode: string | number = (error instanceof HttpException && error.getStatus()) || 400;

        if (error instanceof InputError || error instanceof InternalError) {
            message = error.message;

            if (error.code) {
                statusCode = error.code;
            }
        }

        response.status(statusCode).send({
            statusCode,
            path: request.url,
            ...(message ? { message } : {})
        });
    }
}
