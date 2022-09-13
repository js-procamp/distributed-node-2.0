import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Writable } from 'stream';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly data = ['Arnold', 'Ronaldo', 'Raul'];
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Lol';
  }

  @Get('/data')
  getData(): Array<string> {
    return this.data;
  }

  @Post('/data')
  addData(@Body() body) {
    this.data.push(body.name);
  }

  @Post('/data-text')
  addDataText(@Req() request: Request) {
    // console.log(request.readable);
    // for await (const chunk of request) {
    //   console.log(String(chunk));
    // }

    request.pipe(
      new (class extends Writable {
        _write(
          chunk: any,
          encoding: BufferEncoding,
          callback: (error?: Error) => void,
        ): void {
          console.log(String(chunk));
        }
      })(),
    );
  }

  @Delete('/data/:idx')
  deleteData(@Param('idx') idx) {
    this.data.splice(idx, 1);
  }
}
