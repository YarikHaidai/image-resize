import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto, UserDto } from "../user/dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(user: any) {
    const payload = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async register(user: CreateUserDto): Promise<UserDto> {
    return this.userService.create(user);
  }

  async validateUser(email: string, password: string): Promise<UserDto> {
    const user = await this.userService.findByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      return this.userService.buildDto(user);
    }

    return null;
  }

}
