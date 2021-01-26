import { Injectable } from "@nestjs/common";
import * as sharp from "sharp";
import * as fs from "fs";

@Injectable()
export class ImageService {
    // async resize(width, height, path) {
    //     // TODO: add stream
    //     const buffer = await sharp(path)
    //         .resize(width, height, {
    //             fit: sharp.fit.inside,
    //             withoutEnlargement: true,
    //         })
    //         .toBuffer();
    //     return sharp(buffer).toFile(path);
    // }


    async resize(width, height, path) {
        const resizeTransform = sharp()
            .resize(width, height, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        });

        const readableStream = fs.createReadStream(path);
        const writableStream = fs.createWriteStream('uploads/output.png');
        await readableStream.pipe(resizeTransform).pipe(writableStream);

        return fs.createReadStream('uploads/output.png');
    }

}