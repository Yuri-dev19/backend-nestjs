import type { NextFunction, Request, Response } from 'express';
import { LoggerMiddleware } from './logger.middleware.js';

function criarReq(url: string, role?: string): Request {
  return {
    method: 'GET',
    originalUrl: url,
    path: '/',
    headers: role ? { 'x-user-role': role } : {},
  } as unknown as Request;
}

function criarRes(): Response {
  const res = {} as Response;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe('LoggerMiddleware', () => {
  let middleware: LoggerMiddleware;

  beforeEach(() => {
    middleware = new LoggerMiddleware();
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve chamar next() para uma rota comum', () => {
    const next = vi.fn() as unknown as NextFunction;

    middleware.use(criarReq('/livros/1'), criarRes(), next);

    expect(next).toHaveBeenCalled();
  });

  it('deve logar o método e a URL', () => {
    middleware.use(criarReq('/livros/1'), criarRes(), vi.fn());

    expect(console.log).toHaveBeenCalledWith('[GET] /livros/1');
  });

  it('deve bloquear /admin sem o header com 403', () => {
    const res = criarRes();
    const next = vi.fn();

    middleware.use(criarReq('/admin'), res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Acesso Negado' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve bloquear /admin com cargo diferente', () => {
    const res = criarRes();

    middleware.use(criarReq('/admin', 'estagiario'), res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(403);
  });

  it('deve liberar /admin para supervisor', () => {
    const next = vi.fn();

    middleware.use(criarReq('/admin', 'supervisor'), criarRes(), next);

    expect(next).toHaveBeenCalled();
  });
});
