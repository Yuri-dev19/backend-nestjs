import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

const CARGO_LIBERADO = 'supervisor';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.log(`[${req.method}] ${req.originalUrl}`);

    if (req.originalUrl.startsWith('/admin')) {
      const role = req.headers['x-user-role'];

      if (role !== CARGO_LIBERADO) {
        res.status(403).json({ message: 'Acesso Negado' });
        return;
      }
    }

    next();
  }
}
