import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `DB url: ${process.env.DB_URL}`;
  }
}
