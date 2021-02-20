import { Controller, Get, Param, Query, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { ImageDto, ImagePaginationDto } from "../image/dto";
import { ImageService } from "../image/image.service";

@ApiTags("User")
@UseGuards(JwtAuthGuard)
@Controller("users")
export class UserController {

  constructor(
    private userService: UserService,
    private imageService: ImageService
  ) {}

  @ApiBearerAuth()
  @Get('/images')
  @ApiOkResponse({ type: ImageDto, isArray: true })
  async getImages(@Req() request, @Query() paginationDto: ImagePaginationDto): Promise<ImageDto[]> {
    return this.imageService.getUserImages(request.user.id, paginationDto);
  }

  @ApiBearerAuth()
  @Get('/images/:id')
  @ApiOkResponse({ type: ImageDto })
  async getImage(@Param("id") id: string): Promise<ImageDto> {
    return this.imageService.getUserImage(id);
  }

  @ApiBearerAuth()
  @Get(":id")
  @ApiOkResponse({ type: UserDto })
  getUser(@Param("id") id: string): Promise<UserDto> {
    return this.userService.findById(id);
  }

}
