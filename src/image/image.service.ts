import { Injectable } from "@nestjs/common";
import * as sharp from "sharp";
import * as fs from "fs";
import { Duplex } from "stream";
import { ImageResizeDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageEntity } from "./image.entity";
import { Repository } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { ImageDto } from "./dto/image.dto";

@Injectable()
export class ImageService {
  constructor(@InjectRepository(ImageEntity) private imageRepository: Repository<ImageEntity>) {}

  async upload(user: UserEntity, path: string): Promise<ImageEntity> {
    const image = new ImageEntity();
    image.user = user;
    image.path = path;
    return this.imageRepository.save(image);
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

  async getUserImages(userId): Promise<ImageDto[]> {
    const response = [];
    const images = await this.imageRepository.find({ user: userId });
    images.forEach( image => response.push(this.buildDto(image)) );
    return response;
  }

  buildDto(image: ImageEntity): ImageDto {
    return { id: image.id, path: image.path, created_at: image.created_at };
  }
}