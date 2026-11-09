import { Test, TestingModule } from '@nestjs/testing';
import { MediaController } from './src/media.controller.js';
describe('MediaController', () => {
  let controller: MediaController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaController],
    }).compile();
    controller = module.get<MediaController>(MediaController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('uploadFile deve devolver o nome gerado e o tamanho', () => {
    const arquivo = {
      filename: 'abc-123.png',

      size: 291,
    } as Express.Multer.File;
    expect(controller.uploadFile(arquivo)).toEqual({
      filename: 'abc-123.png',
      size: 291,
    });
  });
});
