import { UsePipes } from '@nestjs/common';
import { ZodTypeAny } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

export function Params(schema: ZodTypeAny): MethodDecorator {
    return (target, propertyKey, descriptor) => {
      UsePipes(new ZodValidationPipe(schema))(target, propertyKey, descriptor);
    };
  }
