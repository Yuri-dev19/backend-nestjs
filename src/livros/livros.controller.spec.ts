import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { LivrosController } from './livros.controller.js';
import { LivrosService } from './livros.service.js';
describe('LivrosController', () => {
  let controller: LivrosController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivrosController],
      providers: [LivrosService],
    }).compile();
    controller = module.get<LivrosController>(LivrosController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('buscarPorId deve converter o id e retornar o livro', () => {
    expect(controller.buscarPorId('2').titulo).toBe('1984');
  });
  it('buscarPorId deve lançar NotFoundException para ID inexistente', () => {
    expect(() => controller.buscarPorId('99')).toThrow(NotFoundException);
  });
});
