import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto, UserDto } from "../user/dto";
import { ResponseLoginDto } from "./dto";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(user: UserDto): Promise<ResponseLoginDto> {
    const payload = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: jwtConstants.refreshToken.signOptions.expiresIn
      })
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
