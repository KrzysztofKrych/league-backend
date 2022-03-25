import { ValidationPipeOptions } from '@nestjs/common';
import { ClassTransformOptions } from 'class-transformer';
import { MessageStatus } from './enums';

export const responseStatuses = {
  [MessageStatus.SUCCESS]: 200,
  [MessageStatus.NO_DATA_FOUND]: 404,
  [MessageStatus.ERROR]: 500,
  [MessageStatus.SOMETHING_WENT_WRONG]: 500,
};
export const DEFAULT_EXCLUDED_PROPERTY_PREFIXES = ['__', '_', '$'];
export const DEFAULT_SERIALIZE_OPTIONS: ClassTransformOptions = {
  excludePrefixes: DEFAULT_EXCLUDED_PROPERTY_PREFIXES,
  exposeDefaultValues: true,
  exposeUnsetFields: true,
  enableImplicitConversion: true,
  enableCircularCheck: true,
  strategy: 'exposeAll',
};

export const DEFAULT_VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
  transform: true,
  enableDebugMessages: true,
  forbidUnknownValues: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  validateCustomDecorators: true,
  transformOptions: {
    enableImplicitConversion: true,
    enableCircularCheck: true,
    excludePrefixes: DEFAULT_EXCLUDED_PROPERTY_PREFIXES,
  },
};
