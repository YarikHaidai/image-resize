import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ImagePaginationDto {
  @ApiProperty()
  @IsString()
  page: number;

  @ApiProperty()
  @IsString()
  limit: number;
}