import { MessageStatus } from '../utils/enums';

export class ResponsePayload {
  data: unknown;

  message: MessageStatus;
}
