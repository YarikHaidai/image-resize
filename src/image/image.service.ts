import {Injectable} from "@nestjs/common";
import * as sharp from 'sharp';

@Injectable()
export class ImageService {
    async resize(width, height, path) {
        // TODO: add stream
        const buffer = await sharp(path)
            .resize(width, height, {
                fit: sharp.fit.inside,
                withoutEnlargement: true,
            })
            .toBuffer();
        return sharp(buffer).toFile(path);
    }
}