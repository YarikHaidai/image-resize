import { IsInt, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ImageResizeDto {
  @ApiProperty()
  @IsString()
  path: string;

  @ApiProperty()
  @IsInt()
  height: number;

  @ApiProperty()
  @IsInt()
  width: number;
}