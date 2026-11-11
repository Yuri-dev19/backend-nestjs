import { Controller, Get } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  @Get()
  painel() {
    return {
      mensagem: 'Bem-vindo ao painel administrativo.',
    };
  }
}
