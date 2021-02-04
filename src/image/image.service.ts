import { Injectable } from "@nestjs/common";
import * as sharp from "sharp";
import * as fs from "fs";
import { Duplex } from "stream";
import { ImageResizeDto } from "./dto";

@Injectable()
export class ImageService {
    async resize(imageResizeDto: ImageResizeDto): Promise<Duplex> {
        const { width, height, path } = imageResizeDto;

        const resizeTransform = sharp()
            .resize(width, height, {
                fit: sharp.fit.inside,
                withoutEnlargement: true
            });

        const readableStream = fs.createReadStream(path);
        return readableStream.pipe(resizeTransform);
    }
}