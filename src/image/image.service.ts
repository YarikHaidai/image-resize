import {Injectable} from "@nestjs/common";
let sharp = require('sharp');

@Injectable()
export class ImageService {
    resize = async (width, height, path) => {
        let buffer = await sharp(path)
            .resize(width, height, {
                fit: sharp.fit.inside,
                withoutEnlargement: true,
            })
            .toBuffer();
        return sharp(buffer).toFile(path);
    }
}