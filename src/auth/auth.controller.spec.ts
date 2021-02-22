import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { RegisterUserDto } from './dto';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto';

describe('AuthController', () => {
  let authController: AuthController;
  let spyAuthService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useFactory: () => ({
            login: jest.fn(() => true),
            register: jest.fn(() => true),
            validateUser: jest.fn(() => true)
          })
        }
      ]
    }).compile();

    authController = module.get(AuthController);
    spyAuthService = module.get(AuthService);
  });

  describe('login', () => {
    it('should login an user', async () => {
      const userDto = new UserDto();
      userDto.id = 1;
      userDto.email = 'email@test.com';
      userDto.name = 'name';
      userDto.surname = 'surname';

      const request = {
        user: userDto
      };

      await authController.login(request);
      expect(spyAuthService.login).toHaveBeenCalledWith(userDto);
    });
  });

  describe('register', () => {
    it('should register an user', async () => {
      const params = new RegisterUserDto();
      params.name = 'name';
      params.surname = 'surname';
      params.email = 'email@test.com';
      params.password = 'password';

      await authController.register(params);
      expect(spyAuthService.register).toHaveBeenCalledWith(params);
    });
  });
});
