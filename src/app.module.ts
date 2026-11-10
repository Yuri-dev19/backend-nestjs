import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConvidadosController } from './convidados/convidados.controller.js';
import { ConvidadosService } from './convidados/convidados.service.js';
import { LivrosController } from './livros/livros.controller.js';
import { LivrosService } from './livros/livros.service.js';
import { MediaController } from './media.controller.js';
import { SegurancaController } from './seguranca/seguranca.controller.js';
import { DemoController } from './demo/demo.controller.js';

@Module({
  imports: [],
  controllers: [
    AppController,
    ConvidadosController,
    LivrosController,
    MediaController,
    SegurancaController,
    DemoController,
  ],
  providers: [AppService, ConvidadosService, LivrosService],
})
export class AppModule {}
