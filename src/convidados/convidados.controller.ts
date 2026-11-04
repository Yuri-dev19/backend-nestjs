import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import type { Convidado } from './interfaces/convidado.interface.js';
import { ConvidadosService } from './convidados.service.js';
import { CreateConvidadoDto } from './dto/create-convidado.dto.js';
import { UpdateConvidadoDto } from './dto/update-convidado.dto.js';

@Controller('convidados')
export class ConvidadosController {
  constructor(private readonly convidadosService: ConvidadosService) {}

  @Get()
  listarTodos(): Convidado[] {
    return this.convidadosService.findAll();
  }

  @Post()
  criar(@Body() createConvidadoDto: CreateConvidadoDto): {
    mensagem: string;
    dados: Convidado;
  } {
    console.log('Convidado recebido:', createConvidadoDto.nome);

    const convidado = this.convidadosService.create(createConvidadoDto);

    return {
      mensagem: `Convidado ${convidado.nome} confirmado com sucesso!`,
      dados: convidado,
    };
  }

  @Patch(':id')
  atualizarIdade(
    @Param('id') id: string,
    @Body() updateConvidadoDto: UpdateConvidadoDto,
  ): Convidado {
    console.log(`Atualizando idade do convidado com ID: ${id}`);

    return this.convidadosService.updateIdade(+id, updateConvidadoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remover(@Param('id') id: string): void {
    console.log(`Removendo convidado com ID: ${id}`);

    this.convidadosService.remove(+id);
  }
}
