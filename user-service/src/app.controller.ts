import {
  ArgumentMetadata,
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  PipeTransform,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Writable } from 'stream';
import { AppService } from './app.service';


export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value === 'error') {
      throw new BadRequestException('Validation failed')
    }
    return Number(value);
  }
}

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  private readonly data = ['Arnold', 'Ronaldo', 'Raul'];
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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

  /**
   * This http method deletes some data
   */
  @Delete('/data/:idx')
  deleteData(@Param('idx', ValidationPipe) idx) {
    this.logger.debug('Hello logger');
    this.logger.verbose('Hello logger');
    this.logger.log('Hello logger');
    this.logger.warn('Hello logger');
    this.logger.error('Hello logger');
 
    this.data.splice(idx, 1);
  }
}
