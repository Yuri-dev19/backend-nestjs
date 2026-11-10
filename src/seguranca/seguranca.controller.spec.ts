import { Test, TestingModule } from '@nestjs/testing';
import type { Response } from 'express';
import { SegurancaController } from './seguranca.controller.js';
// Mock do Response: cada método devolve o próprio objeto,
// para permitir o encadeamento res.status(...).json(...).
function criarResponseMock() {
  const res = {} as Response;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.setHeader = vi.fn().mockReturnValue(res);
  return res;
}
describe('SegurancaController', () => {
  let controller: SegurancaController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SegurancaController],
    }).compile();
    controller = module.get<SegurancaController>(SegurancaController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('deve retornar 403 quando a chave está ausente', () => {
    const res = criarResponseMock();
    controller.acessarSecreto(undefined as unknown as string, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.setHeader).not.toHaveBeenCalled();
  });
  it('deve retornar 403 quando a chave está incorreta', () => {
    const res = criarResponseMock();
    controller.acessarSecreto('chave-errada', res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.setHeader).not.toHaveBeenCalled();
  });

  it('deve retornar 200 e o header x-auth-status com a chave correta', () => {
    const res = criarResponseMock();
    controller.acessarSecreto('SENAI-2026', res);
    expect(res.setHeader).toHaveBeenCalledWith('x-auth-status', 'verificado');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      mensagem: 'Conteúdo Secreto',
    });
  });
});
