import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminController } from './admin/admin.controller.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConvidadosController } from './convidados/convidados.controller.js';
import { ConvidadosService } from './convidados/convidados.service.js';
import { LoggerMiddleware } from './logger/logger.middleware.js';
import { LivrosController } from './livros/livros.controller.js';
import { LivrosService } from './livros/livros.service.js';
import { MediaController } from './media.controller.js';
import { SegurancaController } from './seguranca/seguranca.controller.js';
import { DemoController } from './demo/demo.controller.js';

@Module({
  imports: [],
  controllers: [
    AppController,
    AdminController,
    ConvidadosController,
    LivrosController,
    MediaController,
    SegurancaController,
    DemoController,
  ],
  providers: [AppService, ConvidadosService, LivrosService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}