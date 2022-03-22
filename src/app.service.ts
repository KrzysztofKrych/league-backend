import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  healthcheck() {
    return 'healthcheck from league-backend';
  }
}
