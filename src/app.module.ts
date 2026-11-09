import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConvidadosController } from './convidados/convidados.controller.js';
import { ConvidadosService } from './convidados/convidados.service.js';
import { LivrosController } from './livros/livros.controller.js';
import { LivrosService } from './livros/livros.service.js';

@Module({
  imports: [],
  controllers: [AppController, ConvidadosController, LivrosController],
  providers: [AppService, ConvidadosService, LivrosService],
})
export class AppModule {}
