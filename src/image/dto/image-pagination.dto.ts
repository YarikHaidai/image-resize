import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class ImagePaginationDto {
  @ApiProperty()
  // @IsInt()
  page: number;

  @ApiProperty()
  // @IsInt()
  limit: number;
}