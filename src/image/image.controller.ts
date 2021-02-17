import {
  BadRequestException,
  Controller,
  Get, ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from "fs";
import { imageFileName } from "./utils/image-name.utils";
import { imageExtensionFilter } from "./utils/image-extension.utils";
import { diskStorage } from "multer";
import { ImageResizeDto, ImageResponseDto } from "./dto";
import { ImageService } from "./image.service";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { extname } from "path";
import { ImageDto } from "./dto/image.dto";
import { Pagination } from "nestjs-typeorm-paginate";
import { ImageEntity } from "./image.entity";
import { ConfigService } from "../config/config.service";

@ApiTags("Image")
@UseGuards(JwtAuthGuard)
@Controller("images")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads",
        filename: imageFileName
      }),
      fileFilter: imageExtensionFilter
    })
  )
  @ApiCreatedResponse({ type: ImageResponseDto })
  async upload(@UploadedFile() image, @Req() request) {
    await this.imageService.upload(request.user, image.path);

    return { path: image.path, originalName: image.originalName };
  }

  @Get("resize")
  async resize(@Query() imageResizeDto: ImageResizeDto, @Res() response) {
    if (!fs.existsSync(imageResizeDto.path)) {
       throw new BadRequestException('File not loaded');
    }

    const extension = extname(imageResizeDto.path).replace('.', '');
    response.setHeader("Content-Type", `image/${extension}`);

    const image = await this.imageService.resize({ ...imageResizeDto });
    return image.pipe(response);
  }

  @Get('/get-user-images')
  @ApiOkResponse({ type: ImageDto, isArray: true })
  async getImages(
    @Req() request,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10
  ): Promise<Pagination<ImageEntity>> {
    const host = ConfigService.getVariable('APP_HOST');
    return this.imageService.getUserImages(request.user.id, {
      page,
      limit,
      route: host + '/images/get-user-images',
    });
  }
}
