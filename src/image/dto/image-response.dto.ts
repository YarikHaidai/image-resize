import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ImageResponseDto {
  @IsString()
  @ApiProperty()
  originalName: string;

  @IsString()
  @ApiProperty()
  path: string;
}