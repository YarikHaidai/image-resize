import { Controller, Get, Header, Post, Query, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { imageFileName } from "./utils/image-name.utils";
import { imageExtensionFilter } from "./utils/image-extension.utils";
import { diskStorage } from "multer";
import { ImageResizeDto, ImageResponseDto } from "./dto";
import { ImageService } from "./image.service";
import { ApiCreatedResponse } from "@nestjs/swagger";

@Controller("image")
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
    upload(@UploadedFile() image): ImageResponseDto {

        return {path: image.path, originalName: image.originalName};
    }

    @Get("resize")
    @Header('Content-Type', 'image/png')
    async resize(@Query() imageResizeDto: ImageResizeDto, @Res() response) {
        response.setHeader('Content-Type', 'image/png');

        const image = await this.imageService.resize({...imageResizeDto});
        return image.pipe(response);
    }
}
