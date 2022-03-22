import { ResponsePayload } from '../dto/response-payload';
import { responseStatuses } from './const';
import { MessageStatus } from './enums';

export const sendResponse = (res, payload: ResponsePayload) => {
  res.status(responseStatuses[payload.message]).send({ ...payload });
};

export const getSuccessResponseBody = (data: unknown) => {
  return {
    data,
    message: MessageStatus.SUCCESS,
  };
};

export const getErrorResponseBody = (data: unknown, message: MessageStatus) => {
  return {
    data,
    message,
  };
};