import { MessageStatus } from './enums';

export const responseStatuses = {
  [MessageStatus.SUCCESS]: 200,
  [MessageStatus.NO_DATA_FOUND]: 404,
  [MessageStatus.ERROR]: 500,
  [MessageStatus.SOMETHING_WENT_WRONG]: 500,
};
