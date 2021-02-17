import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";

@ApiTags("User")
@UseGuards(JwtAuthGuard)
@Controller("users")
export class UserController {

  constructor(private service: UserService) {}

  @ApiBearerAuth()
  @Get(":id")
  @ApiOkResponse({ type: UserDto })
  getUser(@Param("id") id: string) {
    return this.service.findById(id);
  }

}
