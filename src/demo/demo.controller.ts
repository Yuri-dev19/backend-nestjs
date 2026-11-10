import { Controller, Get, Header, Headers, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { Readable } from 'stream';
@Controller('demo')
export class DemoController {
  @Get('perfil')
  getPerfil(
    @Headers('authorization') token: string,
    @Headers('user-agent') agente: string,
  ) {
    return { token, agente };
  }
  @Get('todos')
  todos(@Headers() headers: Record<string, string>) {
    return Object.keys(headers).slice(0, 3);
  }
  @Get('versao')
  @Header('x-versao-api', '2.0')
  versao() {
    return { ok: true };
  }
  @Get('produtos')
  @Header('Cache-Control', 'public, max-age=3600')
  produtos() {
    return ['a', 'b'];
  }
  @Get('antigo-endpoint')
  redirecionar(@Res() res: Response) {
    res.redirect(301, '/demo/novo-endpoint');
  }
  @Get('novo-endpoint')
  novo() {
    return 'cheguei no novo';
  }

  @Get('info')
  info(@Req() req: Request) {
    const inicio = Date.now();
    const tempo = Date.now() - inicio;
    return {
      ip: req.ip,
      tempoMs: tempo,
      userAgent: req.headers['user-agent'],
      metodo: req.method,
      rota: req.path,
    };
  }
  @Get('completo')
  completo(@Res() res: Response) {
    res.status(200).setHeader('x-custom', 'valor').json({
      mensagem: 'Sucesso!',
      timestamp: new Date(),
    });
  }

  @Get('esquecido')
  esquecido(@Res() res: Response) {
    void res; // esqueceu de responder: a requisição trava
  }
  @Get('cookie')
  cookie(@Res() res: Response) {
    res.cookie('sessao', 'abc123', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 3600000,
    });
    res.json({ ok: true });
  }
  @Get('ler-cookie')
  lerCookie(@Req() req: Request) {
    return { cookie: req.headers.cookie };
  }
  @Get('relatorio')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="r.csv"')
  baixar(@Res() res: Response) {
    const stream = Readable.from(['id;nome\n', '1;Ana\n', '2;Bruno\n']);
    stream.pipe(res);
  }
}
