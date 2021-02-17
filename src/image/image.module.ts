import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageEntity } from "./image.entity";
import { ImageService } from "./image.service";
import { ImageController } from "./image.controller";
import { ConfigService } from "../config/config.service";

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity])],
  providers: [ImageService, ConfigService],
  controllers: [ImageController],
  exports: [ImageService]
})
export class ImageModule {}
