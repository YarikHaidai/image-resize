import { Test, TestingModule } from '@nestjs/testing';
import { ImageController } from './image.controller';
import { ImageService } from "./image.service";
import {ImageResizeDto} from "./dto";
import {UserEntity} from "../user/user.entity";

describe('ImageController', () => {
  let imageController: ImageController;
  let spyImageService: ImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [
        {
          provide: ImageService,
          useFactory: () => ({
            upload: jest.fn(() => true),
            resize: jest.fn(() => true)
          })
        }
      ]
    }).compile();

    imageController = module.get<ImageController>(ImageController);
    spyImageService = module.get(ImageService);
  });

  describe('upload', () => {
    it('should upload the image', async () => {
      const user = new UserEntity();
      const image = {path : '/image.png'};
      const request = { user };
      await imageController.upload(image, request);

      expect(spyImageService.upload).toHaveBeenCalledWith(user, '/image.png');
    });
  });

  // describe('resize', () => {
  //   it('should resize the image', async () => {
  //     const resizeDto = new ImageResizeDto();
  //     resizeDto.width = 540;
  //     resizeDto.height = 240;
  //     resizeDto.path = '/image.png';
  //
  //     await imageController.resize(resizeDto, {});
  //     expect(spyImageService.resize).toHaveBeenCalledWith(resizeDto);
  //   });
  // });
});
