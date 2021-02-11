import { Injectable } from "@nestjs/common";
import * as sharp from "sharp";
import * as fs from "fs";
import { Duplex } from "stream";
import { ImageResizeDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageEntity } from "./image.entity";
import { Repository } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class ImageService {
  constructor(@InjectRepository(ImageEntity) private imageRepository: Repository<ImageEntity>) {}

  async upload(user: UserEntity, path: string): Promise<ImageEntity> {
    const image = new ImageEntity();
    image.user = user;
    image.path = path;
    return  this.imageRepository.save(image);
  }

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