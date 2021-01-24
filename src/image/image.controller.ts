import {Controller, Get, Post, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {imageFileName} from "./utils/image-name.utils";
import {imageExtensionFilter} from "./utils/image-extension.utils";
import { diskStorage } from 'multer'
import {ResizeImageDto} from "./dto/image-resize.dto";
import {ImageService} from "./image.service";
import { ResponseImageDto } from "./dto/image-response.dto";

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
    upload(@UploadedFile() image) : ResponseImageDto {
        const response = new ResponseImageDto();
        response.originalName = image.originalname;
        response.path = image.path;
        return response;
    }

    @Get('resize')
    resize(@Query() resizeImageDto: ResizeImageDto) {
        return this.imageService.resize(resizeImageDto.width, resizeImageDto.height, resizeImageDto.path);
    }
}
