import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ConvidadosService } from './convidados.service.js';
describe('ConvidadosService', () => {
  let service: ConvidadosService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConvidadosService],
    }).compile();
    service = module.get<ConvidadosService>(ConvidadosService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('findAll deve retornar os 3 convidados iniciais', () => {
    expect(service.findAll()).toHaveLength(3);
  });
  it('create deve adicionar com o próximo ID', () => {
    const novo = service.create({
      nome: 'Diana',
      idade: 30,
    });
    expect(novo).toEqual({
      id: 4,
      nome: 'Diana',
      idade: 30,
    });
    expect(service.findAll()).toHaveLength(4);
  });
  it('findOne deve lançar NotFoundException para ID inexistente', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });
  it('updateIdade deve alterar só a idade', () => {
    const atualizado = service.updateIdade(1, {
      idade: 29,
    });
    expect(atualizado).toEqual({
      id: 1,
      nome: 'Ana',
      idade: 29,
    });
  });
  it('remove deve apagar o convidado e nunca reutilizar o ID', () => {
    service.remove(3);
    expect(service.findAll()).toHaveLength(2);
    expect(() => service.findOne(3)).toThrow(NotFoundException);
    expect(service.create({ nome: 'Eva', idade: 20 }).id).toBe(4);
  });
});
