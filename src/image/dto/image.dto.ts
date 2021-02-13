import { ApiProperty } from "@nestjs/swagger";

export class ImageDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  path: string;

  @ApiProperty()
  created_at: string;
}