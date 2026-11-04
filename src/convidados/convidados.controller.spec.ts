import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ConvidadosController } from './convidados.controller.js';
import { ConvidadosService } from './convidados.service.js';

describe('ConvidadosController', () => {
  let controller: ConvidadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConvidadosController],
      providers: [ConvidadosService],
    }).compile();

    controller = module.get<ConvidadosController>(ConvidadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('listarTodos deve retornar os convidados padrão', () => {
    const nomes = controller.listarTodos().map((c) => c.nome);

    expect(nomes).toEqual(['Ana', 'Bruno', 'Carlos']);
  });

  it('criar deve confirmar o convidado recebido', () => {
    const resultado = controller.criar({
      nome: 'Duda',
      idade: 28,
    });

    expect(resultado.mensagem).toBe(
      'Convidado Duda confirmado com sucesso!',
    );
    expect(resultado.dados).toEqual({
      id: 4,
      nome: 'Duda',
      idade: 28,
    });
  });

  it('atualizarIdade deve alterar só a idade', () => {
    const resultado = controller.atualizarIdade('1', {
      idade: 40,
    });

    expect(resultado).toEqual({
      id: 1,
      nome: 'Ana',
      idade: 40,
    });
  });

  it('remover deve apagar e depois dar 404 para o mesmo ID', () => {
    controller.remover('2');

    expect(() =>
      controller.atualizarIdade('2', { idade: 1 }),
    ).toThrow(NotFoundException);
  });
});
