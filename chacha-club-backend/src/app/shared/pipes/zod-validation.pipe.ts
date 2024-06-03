import { Logger, PipeTransform } from '@nestjs/common';
import { ZodTypeAny, ZodError } from 'zod';
import { InputError } from '../errors/input-error';

export class ZodValidationPipe implements PipeTransform {
    private readonly logger = new Logger(ZodValidationPipe.name);
    constructor(private readonly schema: ZodTypeAny) {}

    transform(value: unknown) {
        try {
            return this.schema.parse(value);
        } catch (error) {
            const e: ZodError = error;

            throw new InputError('Validation failed', e.issues);
        }
    }
}
