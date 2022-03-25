import { ResponsePayload } from '../dto/response-payload';
import { responseStatuses } from './consts';
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
  console.log(data);
  return {
    data,
    message,
  };
};
