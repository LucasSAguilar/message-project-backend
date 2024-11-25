import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Yes, dev, the server is working! By the way, Hello World!';
  }
}
