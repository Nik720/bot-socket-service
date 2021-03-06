import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {  utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import path from 'path';
import * as winston from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config/config';
import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: () => ({
        format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`+(info.splat!==undefined?`${info.splat}`:" "))
        ),
        transports: [
          new winston.transports.Console({
            format: nestWinstonModuleUtilities.format.nestLike(),
          }),
          new winston.transports.File({
            dirname: 'log',
            filename: 'debug.log',
            level: 'debug',
          }),
          new winston.transports.File({
            dirname: 'log',
            filename: 'info.log',
            level: 'info',
          }),
          new winston.transports.File({
            dirname: 'log',
            filename: 'error.log',
            level: 'error',
          }),
        ],
      }),
      inject: [],
    }),
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway, Logger],
  exports: [SocketGateway]
})
export class AppModule {}
