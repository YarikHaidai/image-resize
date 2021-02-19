import {
  BadRequestException,
  Controller,
  Get,
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
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { extname } from "path";

@ApiTags("Image")
@UseGuards(JwtAuthGuard)
@Controller("images")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiBearerAuth()
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

  @ApiBearerAuth()
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
}
