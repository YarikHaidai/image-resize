import { Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller("users")
export class UserController {

  constructor(private service: UserService) {}

  @ApiBearerAuth()
  @Get(":id")
  @ApiOkResponse({ type: UserDto })
  getUser(@Param("id") id: string) {
    return this.service.find(id);
  }

}
