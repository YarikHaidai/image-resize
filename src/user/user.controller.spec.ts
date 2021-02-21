import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from "./user.service";
import { ImageService } from "../image/image.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ImageEntity } from "../image/image.entity";

describe('UserController', () => {
  let imageService: ImageService;
  let findOne : jest.Mock;

  beforeEach(async () => {
    findOne = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      imports: [ ],
      providers: [
        ImageService,
        {
          provide: getRepositoryToken(ImageEntity),
          useValue: {findOne},
        }
      ],
      controllers: [  ]
    }).compile();

    imageService = await module.get(ImageService);
  });


  describe('when getting a image by id', () => {
    describe('and the image is matched', () => {
      let image: ImageEntity;
      beforeEach(() => {
        image = new ImageEntity();
        findOne.mockReturnValue(Promise.resolve(image));
      })
      it('find user image', async () => {
        const fetchImage = await imageService.getUserImage('1');
        expect(image).toEqual(fetchImage);
      });
    })
    describe('and the image is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      })
      it('should throw an error', async () => {
        await expect(imageService.getUserImage('1')).rejects.toThrow();
      })
    })
  })
});
