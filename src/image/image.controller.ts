import {Body, Controller, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {imageFileName} from "./utils/image-name.utils";
import {imageExtensionFilter} from "./utils/image-extension.utils";
import { diskStorage } from 'multer'
import {ResizeImageDto} from "./dto/image.dto";
import {ImageService} from "./image.service";

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads',
                filename: imageFileName,
            }),
            fileFilter: imageExtensionFilter,
        })
    )
    upload(@UploadedFile() image) {
        return {
            originalName: image.originalname,
            path: image.path
        };
    }

    @Post('resize')
    resize(@Body() resizeImageDto: ResizeImageDto) {
        return this.imageService.resize(resizeImageDto.width, resizeImageDto.height, resizeImageDto.path);
    }
}
