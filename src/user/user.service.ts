import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { UserDto } from "./dto";
import { RegisterUserDto } from "../auth/dto";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  async create(user: RegisterUserDto): Promise<UserDto> {
    const entity = Object.assign(new UserEntity(), user);
    const newUser = await this.userRepository.save(entity);
    return this.buildDto(newUser);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new BadRequestException("User not found");
    }
    return user;
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new BadRequestException("User not found");
    }
    return this.buildDto(user);
  }

  buildDto(user: UserEntity): UserDto {
    return { id: user.id, name: user.name, surname: user.surname, email: user.email };
  }
}
