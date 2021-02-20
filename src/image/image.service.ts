import { BadRequestException, Injectable } from "@nestjs/common";
import * as sharp from "sharp";
import * as fs from "fs";
import { Duplex } from "stream";
import { ImagePaginationDto, ImageResizeDto, ImageDto } from "./dto";
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
    return this.imageRepository.save(image);
  }

  async resize(imageResizeDto: ImageResizeDto): Promise<Duplex> {
    const { width, height, path } = imageResizeDto;

    const resizeTransform = sharp()
      .resize(Number(width), Number(height), {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      });

    const readableStream = fs.createReadStream(path);
    return readableStream.pipe(resizeTransform);
  }

  async getUserImages(userId, dto: ImagePaginationDto): Promise<ImageDto[]> {
    const images = await this.imageRepository
      .createQueryBuilder('image')
      .take(dto.limit)
      .skip((dto.page - 1) * dto.limit)
      .where('user_id', userId)
      .getMany();

    return images.map(image => this.buildDto(image));
  }

  async getUserImage(id): Promise<ImageDto> {
    const image = await this.imageRepository.findOne(id);
    if ( !image ) {
      throw new BadRequestException('Image not found');
    }
    return this.buildDto(image);
  }

  buildDto(image: ImageEntity): ImageDto {
    return { id: image.id, path: image.path, created_at: image.created_at };
  }
}