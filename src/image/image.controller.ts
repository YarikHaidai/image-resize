import { Controller, Get, Header, HttpService, Post, Query, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { imageFileName } from "./utils/image-name.utils";
import { imageExtensionFilter } from "./utils/image-extension.utils";
import { diskStorage } from "multer";
import { ImageResizeDto } from "./dto/image-resize.dto";
import { ImageService } from "./image.service";
import { ImageResponseDto } from "./dto/image-response.dto";
import * as fs from "fs";
import { createReadStream, createWriteStream } from "fs";
import * as path from "path";

@Controller("image")
export class ImageController {
    constructor(private readonly imageService: ImageService) {
    }

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
    upload(@UploadedFile() image): ImageResponseDto {
        const response = new ImageResponseDto();
        response.originalName = image.originalname;
        response.path = image.path;
        return response;
    }

    @Get("resize")
    @Header('Content-Type', 'image/png')
    resize(@Query() resizeImageDto: ImageResizeDto, @Res() response) {
        const file = this.imageService.resize(resizeImageDto.width, resizeImageDto.height, resizeImageDto.path);

        const data = createReadStream("/var/www/html/image-resize/uploads/output.png");
        response.setHeader('Content-Type', 'image/png');

        data.pipe(response);
    }
}
