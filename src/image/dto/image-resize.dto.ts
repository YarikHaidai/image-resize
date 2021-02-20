import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ImageResizeDto {
  @ApiProperty()
  @IsString()
  path: string;

  @ApiProperty()
  @IsString()
  height: number;

  @ApiProperty()
  @IsString()
  width: number;
}