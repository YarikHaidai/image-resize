import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { ImageService } from "../image/image.service";
import { UserService } from "./user.service";
import {UserDto} from "./dto";

describe('UserController', () => {
  let userController: UserController;
  let imageService: ImageService;
  let userService: UserService;
  let findOne : jest.Mock;

  beforeEach(async () => {
    findOne = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserService,
          useFactory: () => ({
            findById: jest.fn(() => true)
          })
        }
      ],
      controllers: [UserController]
    }).compile();

    imageService = await module.get(ImageService);
  });


  describe('when getting a user by id', () => {
    it('should return the user', async () => {
      const user = new UserDto();
      user.id = 1;
      user.name = 'name';
      user.email = 'email@test.com';

      await userController.getUser('1');
      expect(userService.findById).toHaveBeenCalledWith(user);
    })
  });
});
