import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller.js';

describe('AdminController', () => {
  let controller: AdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('deve devolver o painel administrativo', () => {
    expect(controller.painel()).toEqual({
      mensagem: 'Bem-vindo ao painel administrativo.',
    });
  });
});
